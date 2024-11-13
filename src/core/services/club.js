import { isValidObjectId } from 'mongoose';

export const packs = [
    {
        id: '21dec724-4a40-48ef-9cf7-89f0fb3c4d07',
        visits: 1,
        price: 590,
        duration: undefined,
        title: '1 занятие'
    },
    {
        id: '3f7eb11c-12c5-4631-af4a-39855ca17810',
        visits: 4,
        price: 2990,
        duration: [1, 'month'],
        title: '4 занятия'
    },
    {
        id: '3d678c9b-632d-492a-aaad-e1ced4f35255',
        visits: 8,
        price: 4990,
        duration: [3, 'month'],
        title: '8 занятий'
    },
    {
        id: '8012db3e-b720-48ea-95a9-ba42772da33d',
        visits: 16,
        price: 7990,
        duration: [6, 'month'],
        title: '16 занятий'
    }
];

const registrationStatusToAction = {
    approved: 'approve',
    canceled: 'cancel',
    denied: 'deny'
};

export default ({
    lib: { zoom },
    models: { Meeting, Ticket, User },
    services: { Auth, Checkout, Mail, Newsletter }
}) => ({
    async getPacks() {
        return packs;
    },

    async getPack(arg) {
        if (typeof arg === 'object' && arg.id) return arg;

        const pack = packs.find(pack => pack.id === arg);

        if (!pack) throw new Error('Пакет не найден');

        return pack;
    },

    async getMember($user) {
        const user = await User.resolve($user);

        if (!user)
            throw new Error('Пользователь не найден.');

        return user;
    },

    async registerMember(data) {
        const member = await Auth.register({
            ...data,
            role: 'member'
        }, { notify: false });

        // Newsletter.subscribe({
        //     name: user.firstname,
        //     email: user.email,
        //     action: 'addnoforce'
        // });

        return member;
    },

    async createTicket($user, $pack) {
        const user = await this.getMember($user);
        const pack = await this.getPack($pack);

        const date = new Date();
        const ticket = new Ticket({
            limit: pack.visits,
            price: pack.price,
            userId: user.id
        });

        ticket.purchasedAt = date;
        ticket.expiresAt = Ticket.getExpiration(date, pack);

        return ticket.save();
    },

    async getTicket($ticket) {
        const ticket = await Ticket.resolve($ticket);

        if (!ticket) throw new Error('Билет не найден');

        return ticket;
    },

    async purchaseTicket(user, planId, meeting = {}) {
        if (!user) throw new Error('Для приобретения билета необходимо указать пользователя.');

        const plan = Ticket.plans[planId] || {};

        return Checkout.createPayment({
            amount: plan.price,
            description: plan.title,
            email: user.email,
            metadata: {
                userId: isValidObjectId(user) ? user : user.id,
                meetingId: isValidObjectId(meeting) ? meeting : meeting.id
            }
        });
    },

    async invalidateTicket(userId, meetingId) {
        return Ticket.findOneAndUpdate(
            { userId },
            { $pull: { meetingIds: meetingId } },
            { new: true }
        );
    },

    findMeetings(...args) {
        return Meeting.find(...args)
            .populate('host', 'firstname lastname avatarUrl');
    },

    findScheduledMeetings(...args) {
        return Meeting.getScheduled(...args);
    },

    findMeeting(...args) {
        const [id, ...rest] = args;

        return (isValidObjectId(id) ?
            Meeting.findById(id, ...rest) :
            Meeting.findOne(...args)
        )
            .populate('host', 'firstname lastname avatarUrl')
            .populate('participants');
    },

    async getMeeting($meeting) {
        const meeting = await Meeting.resolve($meeting);

        if (!meeting) throw new Error('Встреча не найдена');

        return meeting;
    },

    async createMeeting(data, ...args) {
        const meetingData = {};

        if (data.online) {
            const zoomMeetingData = await zoom.meetings.create(Object.assign(data, {
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

            Object.assign(meetingData, zoomMeetingData);
        }

        const meeting = await Meeting.create(data, ...args).populate('host');

        return meeting;
    },

    async updateMeeting(id, data, ...args) {
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

        return meeting.populate('host');
    },

    async cancelMeeting(id) {
        const meeting = await Meeting.findByIdAndUpdate(id, {
            status: 'canceled'
        }, { new: true });

        // send email

        return meeting;
    },

    async deleteMeeting(id, ...args) {
        const meeting = await Meeting.findByIdAndDelete(id, ...args);

        if (meeting.hasRegistrants || meeting.hasParticipants) {
            throw new Error('Невозможно удалить встречу, т.к. в ней есть зарегистрировавшиеся или участники.');
        }

        if (meeting.zoomId) {
            await zoom.meetings.delete(meeting.zoomId);
        }

        return meeting;
    },

    async registerForMeeting($user, $ticket, $meeting) {
        const user = await this.getMember($user);
        const ticket = await this.getTicket($ticket);
        const meeting = await this.getMeeting($meeting);

        if (this.isRegisteredForMeeting(user, meeting))
            throw new Error('Пользователь уже зарегистрирован на встречу');

        if (!ticket || !ticket.isValid)
            throw new Error('Для регистрации на встречу необходимо купить билет');

        const registration = await this.createRegistration(user, ticket, meeting);

        meeting.registrations.addToSet(registration);
        ticket.meetingIds.addToSet(meeting.id);

        // Mail.send({
        //     to: [{
        //         name: `${user.firstname} ${user.lastname}`,
        //         email: user.email
        //     }],
        //     subject: `Спасибо за регистрацию на встречу "${meeting.title}"`,
        //     templateId: meeting.online ? 1348593 : 3188274,
        //     variables: {
        //         firstname: user.firstname,
        //         title: meeting.title,
        //         datetime: meeting.datetime,
        //         host: `${meeting.host.firstname} ${meeting.host.lastname}`,
        //         level: meeting.level,
        //         thumbnailUrl: meeting.thumbnailUrl,
        //         joinUrl: meeting.joinUrl
        //     }
        // });

        return Promise.all([
            meeting.save(),
            ticket.save()
        ]);
    },

    async unregisterFromMeeting($user, $meeting) {
        const user = await this.getMember($user);
        const meeting = await this.getMeeting($meeting);
        const registration = this.getRegistrationByUserId(meeting, user.id);

        if (!meeting.canUnregister(registration))
            throw new Error('Отменить регистрацию нельзя');

        if (meeting.zoomId && registration.zoomId) {
            await zoom.meetings.removeRegistrant(meeting.zoomId, registration.zoomId);
        }

        meeting.registrations.remove(registration);

        return Promise.all([
            meeting.save(),
            Ticket.findOneAndUpdate(
                {
                    userId: user._id,
                    meetingIds: meeting._id
                },
                { $pull: { meetingIds: meeting._id } },
                { new: true }
            )
        ]);
    },

    isRegisteredForMeeting(user, meeting) {
        return !!meeting.findRegistrationByUser(user);
    },

    getRegistration(meeting, registrationId) {
        const registration = meeting.findRegistrationById(registrationId);

        if (!registration) throw new Error('Регистрация на встречу не найдена');

        return registration;
    },

    getRegistrationByUserId(meeting, userId) {
        const registration = meeting.findRegistrationByUser(userId);

        if (!registration) return Promise.reject('Регистрация на встречу на найдена');

        return registration;
    },

    async createRegistration(user, ticket, $meeting, { status } = { status: 'pending' }) {
        const meeting = await this.getMeeting($meeting);
        const registration = meeting.registrations.create({
            registrant: {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            },
            status,
            userId: user.id,
            ticketId: ticket.id
        });

        if (meeting.zoomId) {
            const { join_url, registrant_id } = await zoom.meetings.addRegistrant(meeting.zoomId, {
                email: user.email,
                first_name: user.firstname,
                last_name: user.lastname
            });

            registration.joinUrl = join_url;
            registration.zoomId = registrant_id;
        }

        meeting.registrations.addToSet(registration);

        await meeting.save();

        return registration;
    },

    async updateRegistration($meeting, registrationId, data = {}) {
        const meeting = await this.getMeeting($meeting);
        const registration = this.getRegistration(meeting, registrationId);

        if (meeting.zoomId && registration.zoomId && data.status) {
            await zoom.meetings.updateRegistrantStatus(meeting.zoomId, {
                action: registrationStatusToAction[data.status],
                registrants: [{
                    id: registration.zoomId
                }]
            });
        }

        registration.status = data.status;

        await meeting.save();

        return registration;
    },

    async approveRegistration($meeting, registrationId) {
        const meeting = await this.getMeeting($meeting);
        const registration = this.getRegistration(meeting, registrationId);

        if (!registration.zoomId && meeting.zoomId) {
            const registrant = await zoom.meetings.addRegistrant(meeting.zoomId, {
                email: registration.registrant.email,
                first_name: registration.registrant.firstname,
                last_name: registration.registrant.lastname
            });

            registration.zoomId = registrant.registrant_id;
            registration.joinUrl = registrant.join_url;
            registration.status = 'approved';

            await meeting.save();
        }

        await this.updateRegistration(meeting, registration.id, {
            status: 'approved'
        });

        // Mail.send({
        //     to: [{
        //         name: `${registration.registrant.firstname} ${registration.registrant.lastname}`,
        //         email: registration.registrant.email
        //     }],
        //     subject: `Спасибо за регистрацию на встречу "${meeting.title}"`,
        //     templateId: 1348593,
        //     variables: {
        //         firstname: registration.registrant.firstname,
        //         title: meeting.title,
        //         datetime: meeting.datetime,
        //         host: `${meeting.host.firstname} ${meeting.host.lastname}`,
        //         level: meeting.level,
        //         materialsUrl: meeting.materialsUrl || '',
        //         thumbnailUrl: meeting.thumbnailUrl || '',
        //         joinUrl: meeting.joinUrl
        //     }
        // });

        return registration;
    },

    async cancelRegistration($meeting, registrationId) {
        const meeting = await this.getMeeting($meeting);
        const registration = this.getRegistration(meeting, registrationId);

        await this.updateRegistration(meeting, registration.id, {
            status: 'canceled'
        });

        // send email

        return registration;
    },

    async denyRegistration($meeting, registrationId) {
        const meeting = await this.getMeeting($meeting);
        const registration = this.getRegistration(meeting, registrationId);

        await this.updateRegistration(meeting, registration.id, {
            status: 'denied'
        });

        // if (registration.user) {
        //     const user = {
        //         id: registration.user,
        //         email: registration.registrant.email
        //     };
        //     const payment = await this.createPayment(user, 'single', meeting);

        //     Mail.send({
        //         to: [{
        //             name: `${registration.registrant.firstname} ${registration.registrant.lastname}`,
        //             email: registration.registrant.email
        //         }],
        //         subject: 'Заявка на участие во встрече отклонена',
        //         templateId: 1377309,
        //         variables: {
        //             firstname: registration.registrant.firstname,
        //             title: meeting.title,
        //             datetime: meeting.datetime,
        //             host: `${meeting.host.firstname} ${meeting.host.lastname}`,
        //             level: meeting.level,
        //             thumbnailUrl: meeting.thumbnailUrl,
        //             confirmationUrl: payment.confirmationUrl
        //         }
        //     });
        // }

        return registration;
    },

    async deleteRegistration($meeting, registrationId) {
        const meeting = await this.getMeeting($meeting);
        const registration = this.getRegistration(meeting, registrationId);

        if (registration.zoomId) {
            await zoom.meetings.removeRegistrant(meeting.zoomId, registration.zoomId);
        }

        meeting.registrations.remove(registration);

        await meeting.save();

        return registration;
    },

    async sendMeetingsReminders(when, { templateId } = {}) {
        const meetings = await Meeting.find({
            date: when instanceof Date ? when : when.toDate()
        }).populate('host', 'firstname lastname avatarUrl');

        const messages = meetings.reduce((messages, meeting) => [
            ...messages,
            ...meeting.registrations
                .filter(registration => registration.status === 'approved')
                .map(registration => ({
                    to: [{
                        name: `${registration.registrant.firstname} ${registration.registrant.lastname}`,
                        email: registration.registrant.email
                    }],
                    subject: 'Напоминание о встрече',
                    templateId,
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
                }))
        ], []);

        await Mail.sendMany(messages);
    }
});