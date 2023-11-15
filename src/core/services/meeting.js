const { isValidObjectId } = require('mongoose');
const moment = require('moment');

const registrationActionToStatus = {
    approve: 'approved',
    cancel: 'canceled',
    deny: 'denied'
};

module.exports = ({
    libs: { zoom },
    models: { Meeting },
    services: { User, Mail }
}) => ({
    get(...args) {
        return Meeting.find(...args)
            .populate('host', 'firstname lastname avatarUrl');
    },

    getScheduled() {
        return Meeting.find({
            date: { $gte: new Date() },
            status: 'scheduled',
            published: true
        })
            .sort({ date: 1 })
            .populate('host', 'firstname lastname avatarUrl');
    },

    getOne(query, ...args) {
        return (isValidObjectId(query) ?
            Meeting.findById(query, ...args) :
            Meeting.findOne(query, ...args)
        )
            .populate('host', 'firstname lastname avatarUrl')
            .populate('participants');
    },

    async resolve(arg) {
        if (typeof arg?.id === 'string') return arg;

        const meeting = await this.getOne(arg);

        if (!meeting) throw new Error('Встреча не найдена');

        return meeting;
    },

    async create(data, ...args) {
        if (data.online) {
            const zoomMeeting = await zoom.meetings.create(Object.assign(data, {
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

            Object.assign(data, {
                date: zoomMeeting.start_time,
                zoomId: zoomMeeting.id,
                startUrl: zoomMeeting.start_url,
                joinUrl: zoomMeeting.join_url
            });
        }

        const meeting = await Meeting.create(data, ...args);

        return meeting
            .populate('host')
            .execPopulate();
    },

    async update(id, data, ...args) {
        const meeting = await Meeting.findByIdAndUpdate(id, data, {
            new: true,
            select: '-registrations -participants'
        }, ...args);

        if (meeting.zoomId) {
            await zoom.meetings.update(meeting.zoomId, {
                topic: meeting.title,
                agenda: meeting.description,
                start_time: data.date,
                duration: meeting.duration
            });
        }

        return meeting.populate('host').execPopulate();
    },

    async cancel(id) {
        const meeting = await Meeting.findByIdAndUpdate(id, { status: 'canceled' }, { new: true });

        // send email

        return meeting;
    },

    async delete(id, ...args) {
        const meeting = await Meeting.findByIdAndDelete(id, ...args);

        if (meeting.hasRegistrations) {
            throw new Error('Невозможно удалить встречу, т.к. в ней есть зарегистрировавшиеся или участники.');
        }

        if (meeting.zoomId) {
            await zoom.meetings.delete(meeting.zoomId);
        }

        return meeting;
    },

    async register(meetingId, userId) {
        const meeting = await this.resolve(meetingId);
        const user = await User.resolve(userId);

        if (!meeting.canRegister(user)) {
            throw new Error('Для регистрации на встречу необходимо пополнить баланс');
        }

        const registration = meeting.getRegistrationByUser(user);

        if (registration?.isApproved) {
            throw new Error('Регистрация на встречу уже создана');
        }

        const updatedMeeting = await (registration?.isCanceled ?
            this.updateRegistration(meeting, registration.id, 'approve') :
            this.addRegistration(meeting, user)
        );

        const updatedUser = await User.decreaseBalance(user, meeting.price);

        Mail.send({
            to: [{
                name: updatedUser.fullname,
                email: updatedUser.email
            }],
            subject: `Спасибо за регистрацию на встречу "${meeting.title}"`,
            templateId: meeting.online ? 1348593 : 3188274,
            variables: {
                firstname: updatedUser.firstname,
                title: meeting.title,
                datetime: meeting.datetime,
                host: `${meeting.host.firstname} ${meeting.host.lastname}`,
                level: meeting.level,
                thumbnailUrl: meeting.thumbnailUrl,
                joinUrl: meeting.joinUrl
            }
        });

        return [updatedMeeting, updatedUser];
    },

    async unregister(meetingId, userId) {
        const meeting = await this.resolve(meetingId);
        const user = await User.resolve(userId);
        const registration = meeting.getRegistrationByUser(user);

        if (!meeting.canUnregister(registration)) {
            throw new Error('Отменить регистрацию нельзя');
        }

        const updatedMeeting = await this.cancelRegistration(meeting, registration?.id);
        const updatedUser = await User.increaseBalance(user, meeting.price, false);

        return [updatedMeeting, updatedUser];
    },

    findRegistration(meeting, id) {
        const registration = meeting.getRegistrationById(id);

        if (!registration) {
            throw new Error('Регистрация на встречу не найдена');
        }

        return registration;
    },

    async addRegistration(meetingId, userId) {
        const meeting = await this.resolve(meetingId);
        const user = await User.resolve(userId);

        if (meeting.isRegistered(user)) {
            throw new Error('Пользователь уже зарегистрирован на встречу');
        }

        let registrant = {};

        if (meeting.zoomId) {
            registrant = await zoom.meetings.addRegistrant(meeting.zoomId, {
                email: user.email,
                first_name: user.firstname,
                last_name: user.lastname
            });
        }

        const registration = meeting.registrations.create({
            status: 'approved',
            zoomId: registrant.registrant_id,
            joinUrl: registrant.join_url,
            user: user.id,
            registrant: {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            }
        });

        meeting.registrations.addToSet(registration);

        return meeting.save();
    },

    async updateRegistration(meetingId, registrationId, action) {
        const meeting = await this.resolve(meetingId);
        const registration = this.findRegistration(meeting, registrationId);

        if (registration.zoomId) {
            await zoom.meetings.updateRegistrantStatus(meeting.zoomId, {
                action,
                registrants: [{
                    id: registration.zoomId
                }]
            });
        }

        registration.status = registrationActionToStatus[action];

        return meeting.save();
    },

    async approveRegistration(meetingId, registrationId) {
        const meeting = await this.resolve(meetingId);
        const registration = this.findRegistration(meeting, registrationId);

        if (registration.zoomId) {
            return this.updateRegistration(meeting, registration.id, 'approve');
        } else if (meeting.zoomId) {
            const registrant = await zoom.meetings.addRegistrant(meeting.zoomId, {
                email: registration.registrant.email,
                first_name: registration.registrant.firstname,
                last_name: registration.registrant.lastname
            });

            registration.status = 'approved';
            registration.zoomId = registrant.registrant_id;
            registration.joinUrl = registrant.join_url;

            await meeting.save();
        }

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
                materialsUrl: meeting.materialsUrl || '',
                thumbnailUrl: meeting.thumbnailUrl || '',
                joinUrl: meeting.joinUrl
            }
        });

        return registration;
    },

    async denyRegistration(meetingId, registrationId) {
        const meeting = await this.resolve(meetingId);
        const registration = this.findRegistration(meeting, registrationId);

        if (meeting.zoomId) {
            await zoom.meetings.updateRegistrantStatus(meeting.zoomId, {
                action: 'deny',
                registrants: [{
                    id: registration.zoomId
                }]
            });
        }

        registration.status = 'denied';

        if (registration.user) {
            const registrant = registration.registrant;
            const payment = await this.register(meeting, {
                id: registration.user,
                email: registrant.email
            });

            Mail.send({
                to: [{
                    name: `${registrant.firstname} ${registrant.lastname}`,
                    email: registrant.email
                }],
                subject: 'Заявка на участие во встрече отклонена',
                templateId: 1377309,
                variables: {
                    firstname: registrant.firstname,
                    title: meeting.title,
                    datetime: meeting.datetime,
                    host: `${meeting.host.firstname} ${meeting.host.lastname}`,
                    level: meeting.level,
                    thumbnailUrl: meeting.thumbnailUrl,
                    confirmationUrl: payment.confirmationUrl
                }
            });
        }

        return meeting.save();
    },

    async cancelRegistration(meetingId, registrationId) {
        const meeting = await this.resolve(meetingId);
        const registration = this.findRegistration(meeting, registrationId);

        if (registration.isCanceled) {
            throw new Error('Регистрация уже отменена');
        }

        if (meeting.zoomId) {
            await zoom.meetings.updateRegistrantStatus(meeting.zoomId, {
                action: 'cancel',
                registrants: [{
                    id: registration.zoomId
                }]
            });
            registration.status = 'canceled';
        }

        return meeting.save();
    },

    async removeRegistration(meetingId, registrationId) {
        const meeting = await this.resolve(meetingId);
        const registration = this.findRegistration(meeting, registrationId);

        if (registration.zoomId) {
            await zoom.meetings.removeRegistrant(meeting.zoomId, registration.zoomId);
        }

        meeting.registrations.remove(registration);

        return meeting.save();
    },

    async notifyRegistrantsDayBefore() {
        const inADay = moment().utc().seconds(0).milliseconds(0).add(1, 'day').toDate();

        const meetings = await Meeting.find({ date: inADay })
            .populate('host', 'firstname lastname avatarUrl');

        const messages = meetings.reduce((allMessages, meeting) => {
            const messages = meeting.registrations
                .filter(registration => registration.status === 'approved')
                .map(registration => ({
                    to: [{
                        name: `${registration.registrant.firstname} ${registration.registrant.lastname}`,
                        email: registration.registrant.email
                    }],
                    subject: 'Напоминание о встрече',
                    templateId: 1348661,
                    variables: {
                        firstname: registration.registrant.firstname,
                        title: meeting.title,
                        datetime: meeting.datetime,
                        host: `${meeting.host.firstname} ${meeting.host.lastname}`,
                        level: meeting.level,
                        thumbnailUrl: meeting.thumbnailUrl || '',
                        materialsUrl: meeting.materialsUrl || '',
                        joinUrl: registration.joinUrl
                    }
                }));

            return allMessages.concat(messages);
        }, []);

        if (messages.length > 0) {
            return Mail.sendMany(messages);
        }
    },

    async notifyRegistrantsHourBefore() {
        const inAnHour = moment().utc().seconds(0).milliseconds(0).add(1, 'hour').toDate();

        const meetings = await Meeting.find({ date: inAnHour })
            .populate('host', 'firstname lastname avatarUrl');

        const messages = meetings.reduce((allMessages, meeting) => {
            const messages = meeting.registrations
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
                        thumbnailUrl: meeting.thumbnailUrl || '',
                        materialsUrl: meeting.materialsUrl || '',
                        joinUrl: registration.joinUrl
                    }
                }));

            return allMessages.concat(messages);
        }, []);

        if (messages.length > 0) {
            return Mail.sendMany(messages);
        }
    }
});