import moment from 'moment';
import { isValidObjectId, Types } from 'mongoose';

const { ObjectId } = Types;

const registrationActionToStatus = {
    approve: 'approved',
    cancel: 'canceled',
    deny: 'denied'
};

export default (Zoom, { Meeting, Ticket }, { Checkout, Mail, Newsletter }) => ({
    getMeetings(...args) {
        return Meeting.find(...args)
            .populate('host', 'firstname lastname avatarUrl');
    },

    getMeeting(...args) {
        const [id, ...rest] = args;

        return (isValidObjectId(id) ?
            Meeting.findById(id, ...rest) :
            Meeting.findOne(...args)
        )
            .populate('host', 'firstname lastname avatarUrl')
            .populate('participants');
    },

    async createMeeting(data, ...args) {
        const zoomMeeting = await Zoom.meetings.create(Object.assign(data, {
            topic: data.title,
            agenda: data.description,
            start_time: data.date,
            timezone: undefined,
            settings: {
                join_before_host: false,
                waiting_room: false,
                approval_type: 0, // automatically approve
                close_registration: true,
                registrants_email_notification: false
            }
        }));

        const meeting = await Meeting.create(Object.assign(data, {
            date: zoomMeeting.start_time,
            zoomId: zoomMeeting.id,
            startUrl: zoomMeeting.start_url,
            joinUrl: zoomMeeting.join_url
        }), ...args);

        return meeting.populate('host').execPopulate();
    },

    async updateMeeting(id, data, ...args) {
        const meeting = await Meeting.findByIdAndUpdate(id, data, {
            new: true,
            select: '-registrations -participants'
        }, ...args);

        await Zoom.meetings.update(meeting.zoomId, {
            topic: meeting.title,
            agenda: meeting.description,
            start_time: data.date,
            duration: meeting.duration
        });

        return meeting.populate('host').execPopulate();
    },

    async cancelMeeting(id) {
        const meeting = await Meeting.findByIdAndUpdate(id, { status: 'canceled' }, { new: true });

        // send email

        return meeting;
    },

    async deleteMeeting(id, ...args) {
        const meeting = await Meeting.findByIdAndDelete(id, ...args);

        if (meeting.hasRegistrants || meeting.hasParticipants) {
            throw new Error('Невозможно удалить встречу, т.к. в ней есть зарегистрировавшиеся или участники.');
        }

        await Zoom.meetings.delete(meeting.zoomId);

        return meeting;
    },

    async createPayment(user, planId, meeting = {}) {
        if (!user) throw new Error('Для приобретения билета необходимо указать пользователя.');

        const plan = Ticket.plans[planId] || {};

        return Checkout.createPayment({
            amount: plan.price,
            description: plan.title,
            email: user.email,
            metadata: {
                userId: ObjectId.isValid(user) ? user : user.id,
                planId: plan.id,
                meetingId: ObjectId.isValid(meeting) ? meeting : meeting.id
            }
        });
    },

    async register(meetingId, user, ticket) {
        if (!ticket || !ticket.isActive) throw new Error('Для регистрации на встречу необходимо купить билет');

        const meeting = await (ObjectId.isValid(meetingId) ? this.getById(meetingId) : meetingId);

        if (this.isRegistered(meeting, user)) throw new Error('Пользователь уже зарегистрирован на встречу');

        const data = await Zoom.meetings.addRegistrant(meeting.zoomId, {
            email: user.email,
            first_name: user.firstname,
            last_name: user.lastname
        });

        const registration = meeting.registrations.create({
            zoomId: data.registrant_id,
            user: user.id,
            ticket: ticket.id,
            registrant: {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            },
            status: 'approved',
            joinUrl: data.join_url
        });

        meeting.registrations.addToSet(registration);
        ticket.meeting = meeting.id;

        Mail.send({
            to: [{
                name: `${registration.registrant.firstname} ${registration.registrant.lastname}`,
                email: registration.registrant.email
            }],
            subject: `Спасибо за регистрацию на встречу "${meeting.title}"`,
            templateId: 1348593,
            variables: {
                firstname: registration.registrant.firstname,
                title: meeting.title,
                datetime: meeting.datetime,
                host: `${meeting.host.firstname} ${meeting.host.lastname}`,
                level: meeting.level,
                thumbnailUrl: meeting.thumbnailUrl,
                joinUrl: meeting.joinUrl
            }
        });

        Newsletter.subscribe({
            name: user.firstname,
            email: user.email,
            action: 'addnoforce'
        });

        return Promise.all([
            meeting.save(),
            ticket.save()
        ]);
    },

    async unregister(meetingId, user) {
        const meeting = await (ObjectId.isValid(meetingId) ? this.getById(meetingId) : meetingId);
        const registration = meeting.registrations.find(r => r.user == user.id);

        if (!registration) return Promise.reject('Регистрация на встречу на найдена');

        await Zoom.meetings.removeRegistrant(meeting.zoomId, registration.id);

        meeting.registrations.remove(registration);

        return Promise.all([
            meeting.save(),
            Ticket.findOneAndUpdate(
                { user, meeting },
                { $unset: { meeting: '' } },
                { new: true }
            )
        ]);
    },

    async addRegistration(meetingId, data) {
        const meeting = await (ObjectId.isValid(meetingId) ? this.getById(meetingId) : meetingId);

        const registration = meeting.registrations.create(data);

        meeting.registrations.addToSet(registration);

        if (data.status === 'approved') {
            return await this.approveRegistration(meeting, registration.id);
        } else {
            await meeting.save();

            return registration;
        }
    },

    async updateRegistration(meetingId, registrationId, action) {
        const meeting = await (ObjectId.isValid(meetingId) ? this.getById(meetingId) : meetingId);
        const registration = meeting.registrations.find(r => r.id == registrationId);

        if (!registration) throw new Error('Регистрация на встречу не найдена');

        if (registration.zoomId) {
            await Zoom.meetings.updateRegistrantStatus(meeting.zoomId, {
                action,
                registrants: [{
                    id: registration.zoomId
                }]
            });
        }

        registration.status = registrationActionToStatus[action];

        await meeting.save();

        return registration;
    },

    async approveRegistration(meetingId, registrationId) {
        const meeting = await (ObjectId.isValid(meetingId) ? this.getById(meetingId) : meetingId);
        const registration = meeting.registrations.find(r => r.id == registrationId);

        if (!registration) throw new Error('Регистрация на встречу не найдена');

        if (registration.zoomId) {
            return this.updateRegistration(meeting, registration.id, 'approve');
        } else {
            const registrant = await Zoom.meetings.addRegistrant(meeting.zoomId, {
                email: registration.registrant.email,
                first_name: registration.registrant.firstname,
                last_name: registration.registrant.lastname
            });

            registration.zoomId = registrant.registrant_id;
            registration.joinUrl = registrant.join_url;
            registration.status = 'approved';

            await meeting.save();

            Mail.send({
                to: [{
                    name: `${registration.registrant.firstname} ${registration.registrant.lastname}`,
                    email: registration.registrant.email
                }],
                subject: `Спасибо за регистрацию на встречу "${meeting.title}"`,
                templateId: 1348593,
                variables: {
                    firstname: registration.registrant.firstname,
                    title: meeting.title,
                    datetime: meeting.datetime,
                    host: `${meeting.host.firstname} ${meeting.host.lastname}`,
                    level: meeting.level,
                    thumbnailUrl: meeting.thumbnailUrl,
                    joinUrl: meeting.joinUrl
                }
            });

            return registration;
        }
    },

    async cancelRegistration(meetingId, registrationId) {
        const meeting = await (ObjectId.isValid(meetingId) ? this.getById(meetingId) : meetingId);
        const registration = meeting.registrations.find(r => r.id == registrationId);

        if (!registration) throw new Error('Регистрация на встречу не найдена');

        await Zoom.meetings.updateRegistrantStatus(meeting.zoomId, {
            action: 'cancel',
            registrants: [{
                id: registration.zoomId
            }]
        });

        await meeting.save();

        return registration;
    },

    async denyRegistration(meetingId, registrationId) {
        const meeting = await (ObjectId.isValid(meetingId) ? this.getById(meetingId) : meetingId);
        const registration = meeting.registrations.find(r => r.id == registrationId);

        if (!registration) throw new Error('Регистрация на встречу не найдена');

        await Zoom.meetings.updateRegistrantStatus(meeting.zoomId, {
            action: 'deny',
            registrants: [{
                id: registration.zoomId
            }]
        });

        registration.status = 'denied';

        await meeting.save();

        if (registration.user) {
            const user = {
                id: registration.user,
                email: registration.registrant.email
            };
            const payment = await this.createPayment(user, 'single', meeting);

            Mail.send({
                to: [{
                    name: `${registration.registrant.firstname} ${registration.registrant.lastname}`,
                    email: registration.registrant.email
                }],
                subject: 'Заявка на участие во встрече отклонена',
                templateId: 1377309,
                variables: {
                    firstname: registration.registrant.firstname,
                    title: meeting.title,
                    datetime: meeting.datetime,
                    host: `${meeting.host.firstname} ${meeting.host.lastname}`,
                    level: meeting.level,
                    thumbnailUrl: meeting.thumbnailUrl,
                    confirmationUrl: payment.confirmationUrl
                }
            });
        }

        return registration;
    },

    async removeRegistration(meetingId, registrationId) {
        const meeting = await (ObjectId.isValid(meetingId) ? this.getById(meetingId) : meetingId);
        const registration = meeting.registrations.find(r => r.id == registrationId);

        if (!registration) return Promise.reject('Регистрация на встречу на найдена');

        if (registration.zoomId) {
            await Zoom.meetings.removeRegistrant(meeting.zoomId, registration.zoomId);
        }

        meeting.registrations.remove(registration);

        await meeting.save();

        return registration;
    },

    isRegistered(meeting, user) {
        return meeting.registrations.find(r => r.user == user.id);
    },

    notifyRegistrants() {
        const inAnHour = moment().utc().minutes(0).seconds(0).milliseconds(0).add(1, 'hour');

        Meeting.find({
            date: inAnHour.toDate()
        })
            .populate('host', 'firstname lastname avatarUrl')
            .then(meetings => {
                const messages = meetings.reduce((messages, meeting) => {
                    return [
                        ...messages,
                        ...meeting.registrations
                            .filter(registration => registration.status === 'approved')
                            .map(registration => ({
                                to: [{
                                    name: `${registration.registrant.firstname} ${registration.registrant.lastname}`,
                                    email: registration.registrant.email
                                }],
                                subject: 'Напоминание о встрече',
                                templateId: 1348680,
                                variables: {
                                    firstname: registration.registrant.firstname,
                                    title: meeting.title,
                                    datetime: meeting.datetime,
                                    host: `${meeting.host.firstname} ${meeting.host.lastname}`,
                                    level: meeting.level,
                                    thumbnailUrl: meeting.thumbnailUrl,
                                    joinUrl: registration.joinUrl
                                }
                            }))
                    ];
                }, []);

                if (messages.length > 0) {
                    Mail.sendMany(messages);
                }
            });
    }
});