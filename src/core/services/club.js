import { isValidObjectId } from 'mongoose';

const CLUB_EMAIL = 'club@sayyes.school';
const CLUB_NAME = 'SAY YES Speaking Club';

const FROM = {
    email: CLUB_EMAIL,
    name: CLUB_NAME
};

const emailTemplates = {
    MEMBER_REGISTRATION: 6476492,
    MEETING_REGISTRATION_ONLINE: 6476555,
    MEETING_REGISTRATION_OFFLINE: 6476558,
    MEETING_REGISTRATION_DENIED: 6476560,
    MEETING_REMINDER_24H: 6476571,
    MEETING_REMINDER_1H: 6476573,
    MEETING_FEEDBACK: 6476574,
    TICKET_PURCHASE: 6476579
};

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
        discount: 0,
        duration: [1, 'month'],
        title: '4 занятия'
    },
    {
        id: '3d678c9b-632d-492a-aaad-e1ced4f35255',
        visits: 8,
        price: 4990,
        discount: 1000,
        duration: [3, 'month'],
        title: '8 занятий'
    },
    {
        id: '8012db3e-b720-48ea-95a9-ba42772da33d',
        visits: 16,
        price: 7990,
        discount: 2000,
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
    emailTemplates,

    async getPacks() {
        return packs.map(pack => ({
            ...pack,
            description: pack.duration ?
                `Срок действия ${pack.duration[0]} мес.` :
                'Срок действия неограничен',
            priceWithoutDiscount: pack.discount && pack.price + pack.discount,
            pricePerMonth: pack.duration && Math.round(pack.price / pack.duration[0])
        }));
    },

    async getPack(arg) {
        if (typeof arg === 'object' && arg.id) return arg;

        const pack = packs.find(pack => pack.id === arg);

        if (!pack) throw {
            status: 404,
            message: 'Пакет не найден'
        };

        return pack;
    },

    async getMember($user) {
        const user = await User.resolve($user);

        if (!user) throw {
            status: 404,
            message: 'Пользователь не найден'
        };

        return user;
    },

    async registerMember({ name = '', email } = { }) {
        const [firstname, lastname] = name.split(' ');
        const password = Auth.generatePassword();
        const user = await Auth.register({
            firstname,
            lastname,
            email,
            password,
            role: 'member'
        });

        Mail.send({
            subject: 'Добро пожаловать в Разговорный клуб SAY YES!',
            to: {
                name: user.fullname,
                email: user.email
            },
            from: FROM,
            templateId: emailTemplates.MEMBER_REGISTRATION,
            variables: {
                firstname: user.firstname,
                email: user.email,
                password
            }
        });

        Mail.send({
            subject: 'Пользователь зарегистрировался в разговорном клубе',
            to: CLUB_EMAIL,
            html: `Имя: ${user.firstname}\nEmail: ${user.email}`
        });

        Newsletter.subscribe({
            name: user.firstname,
            email: user.email,
            action: 'addnoforce'
        });

        return user;
    },

    async createTicket($user, $pack, paymentId) {
        const user = await this.getMember($user);
        const pack = await this.getPack($pack);

        const date = new Date();
        const ticket = new Ticket({
            limit: pack.visits,
            price: pack.price,
            userId: user.id,
            paymentId
        });

        ticket.purchasedAt = date;
        ticket.expiresAt = Ticket.getExpiration(date, pack);

        return ticket.save();
    },

    async findValidTicket($user) {
        const userId = isValidObjectId($user) ? $user : $user?.id;
        const tickets = await Ticket.find({ userId });

        return tickets.find(ticket => ticket.isValid);
    },

    async getTicket($ticket) {
        const ticket = await Ticket.resolve($ticket);

        if (!ticket) throw {
            status: 404,
            message: 'Билет не найден'
        };

        return ticket;
    },

    async purchaseTicket(user, planId, meeting = {}) {
        if (!user) throw {
            status: 400,
            message: 'Для приобретения билета необходимо указать пользователя.'
        };

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
            .populate('host', 'firstname lastname avatarUrl')
            .sort({ date: -1 });
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
            .populate('registrations.user')
            .populate('participants');
    },

    async getMeeting($meeting) {
        const meeting = await Meeting.resolve($meeting);

        if (!meeting) throw {
            status: 404,
            message: 'Встреча не найдена'
        };

        return meeting.populate('host', 'firstname lastname avatarUrl');
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

        const meeting = await Meeting.create(data, ...args);

        return meeting.populate('host');
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

        if (meeting.hasRegistrants || meeting.hasParticipants) throw {
            status: 400,
            message: 'Невозможно удалить встречу, т.к. в ней есть зарегистрировавшиеся или участники.'
        };

        if (meeting.zoomId)
            await zoom.meetings.delete(meeting.zoomId);

        return meeting;
    },

    async registerForMeeting($user, $meeting, $ticket, { force, notify } = { force: false, notify: true }) {
        const user = await this.getMember($user);
        const meeting = await this.getMeeting($meeting);
        const ticket = await ($ticket ?
            this.getTicket($ticket) :
            this.findValidTicket(user)
        );

        if (this.isRegisteredForMeeting(user, meeting)) throw {
            status: 400,
            message: 'Пользователь уже зарегистрирован на встречу'
        };

        if (!force && !meeting.isFree && ticket && !ticket.isValid) throw {
            status: 400,
            message: 'Для регистрации на встречу необходимо купить новый билет'
        };

        const registration = await this.createRegistration(meeting, user, ticket);

        meeting.registrations.addToSet(registration);

        if (ticket) {
            ticket.meetingIds.addToSet(meeting.id);
            await ticket.save();
        }

        await meeting.save();

        if (notify) {
            Mail.send({
                to: {
                    name: user.fullname,
                    email: user.email
                },
                subject: `Спасибо за регистрацию на встречу "${meeting.title}"`,
                templateId: meeting.online ?
                    emailTemplates.MEETING_REGISTRATION_ONLINE :
                    emailTemplates.MEETING_REGISTRATION_OFFLINE,
                variables: {
                    firstname: user.firstname,
                    title: meeting.title,
                    datetime: meeting.datetime,
                    host: meeting.host?.fullname,
                    level: meeting.level,
                    thumbnailUrl: meeting.thumbnailUrl,
                    joinUrl: meeting.joinUrl
                }
            });
        }

        return registration;
    },

    async unregisterFromMeeting($user, $meeting) {
        const user = await this.getMember($user);
        const meeting = await this.getMeeting($meeting);
        const registration = this.getRegistrationByUser(meeting, user);

        if (!meeting.canUnregister(registration)) throw {
            status: 400,
            message: 'Отменить регистрацию нельзя'
        };

        if (meeting.zoomId && registration.zoomId)
            await zoom.meetings.removeRegistrant(meeting.zoomId, registration.zoomId);

        meeting.registrations.remove(registration);

        const [savedMeeting] = await Promise.all([
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

        return savedMeeting;
    },

    isRegisteredForMeeting(user, meeting) {
        return !!meeting.findRegistrationByUser(user);
    },

    getRegistration(meeting, registrationId) {
        const registration = meeting.findRegistrationById(registrationId);

        if (!registration) throw {
            status: 404,
            message: 'Регистрация на встречу не найдена'
        };

        return registration;
    },

    getRegistrationByUser(meeting, $user) {
        const registration = meeting.findRegistrationByUser($user);

        if (!registration) throw {
            status: 404,
            message: 'Регистрация на встречу не найдена'
        };

        return registration;
    },

    async createRegistration($meeting, $user, ticket, { status } = { status: 'pending' }) {
        const meeting = await this.getMeeting($meeting);
        const user = await this.getMember($user);
        const registration = meeting.registrations.create({
            registrant: {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            },
            status,
            userId: user.id,
            ticketId: ticket?.id
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

        const registrant = registration.registrant;

        Mail.send({
            to: {
                name: `${registrant.firstname} ${registrant.lastname}`,
                email: registrant.email
            },
            subject: `Спасибо за регистрацию на встречу "${meeting.title}"`,
            templateId: 1348593,
            variables: {
                firstname: registrant.firstname,
                title: meeting.title,
                datetime: meeting.datetime,
                host: meeting.host?.fullname,
                level: meeting.level,
                materialsUrl: meeting.materialsUrl || '',
                thumbnailUrl: meeting.thumbnailUrl || '',
                joinUrl: meeting.joinUrl
            }
        });

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
                    to: {
                        name: `${registration.registrant.firstname} ${registration.registrant.lastname}`,
                        email: registration.registrant.email
                    },
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