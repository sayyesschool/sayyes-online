import { isObjectIdOrHexString } from 'mongoose';

import { getWordEnding } from '@/shared/utils/format';

const CLUB_NAME = 'SAY YES Speaking Club';

const emailTemplates = {
    MEMBER_REGISTRATION: 6476492,
    MEETING_CANCELED: 1111111,
    MEETING_REGISTRATION_ONLINE: 6476555,
    MEETING_REGISTRATION_OFFLINE: 6476558,
    MEETING_REGISTRATION_DENIED: 6476560,
    MEETING_REMINDER_24H: 6476571,
    MEETING_REMINDER_1H: 6476573,
    MEETING_FEEDBACK: 6476574,
    MEMBERSHIP_PURCHASE: 6476579
};

const registrationStatusToAction = {
    approved: 'approve',
    canceled: 'cancel',
    denied: 'deny'
};

const durationLabels = {
    week: ['неделя', 'недели', 'недель'],
    month: ['месяц', 'месяца', 'месяцев']
};

export default ({
    config,
    lib: { zoom },
    models: { Data, Meeting, Membership, Payment, Registration, Request, User },
    services: { Auth, Checkout, Mail, Newsletter }
}) => ({
    email: `club@${config.APP_DOMAIN}`,
    emailTemplates,
    packs: null,

    async getPacks() {
        if (this.packs) return this.packs;

        const packs = await Data.get('club.packs');

        this.packs = packs.map(pack => ({
            ...pack,
            title: `${pack.visits} ${getWordEnding('заняти', pack.visits, ['е', 'я', 'й'])}`,
            description: `Срок действия ${pack.duration[0]} ${getWordEnding('', pack.duration[0], durationLabels[pack.duration[1]])}`,
            discount: pack.priceWithoutDiscount - pack.price,
            pricePerMonth: pack.duration && Math.round(pack.price / pack.duration[0])
        }));

        return this.packs;
    },

    async getPack(arg) {
        if (typeof arg === 'object' && arg.id) return arg;

        const packs = await this.getPacks();
        const pack = packs.find(pack => pack.id === arg);

        if (!pack) throw {
            status: 404,
            message: 'Пакет не найден'
        };

        return pack;
    },

    async getUser($user) {
        const user = await User.resolve($user);

        if (!user) throw {
            status: 404,
            message: 'Пользователь не найден'
        };

        return user;
    },

    async registerUser({ name = '', email } = { }) {
        const [firstname, lastname] = name.split(' ');
        const password = Auth.generatePassword();
        const user = await Auth.register({
            firstname,
            lastname,
            email,
            password,
            domains: ['club', 'lk']
        });

        Mail.send({
            subject: 'Добро пожаловать в Разговорный клуб SAY YES!',
            to: {
                name: user.fullname,
                email: user.email
            },
            from: {
                email: this.email,
                name: CLUB_NAME
            },
            templateId: emailTemplates.MEMBER_REGISTRATION,
            variables: {
                firstname: user.firstname,
                email: user.email,
                password
            }
        });

        Mail.send({
            subject: 'Пользователь зарегистрировался в разговорном клубе',
            to: this.email,
            html: `Имя: ${user.firstname}\nEmail: ${user.email}`
        });

        Newsletter.subscribe({
            name: user.firstname,
            email: user.email,
            action: 'addnoforce'
        });

        return user;
    },

    async createMembership($user, $pack, paymentId) {
        const user = await this.getUser($user);
        const pack = await this.getPack($pack);

        const startDate = new Date();
        const endDate = Membership.getEndDate(startDate, pack);

        return Membership.create({
            limit: pack.visits,
            price: pack.price,
            userId: user.id,
            paymentId,
            startDate,
            endDate
        });
    },

    async findUserMemberships($user) {
        const userId = isObjectIdOrHexString($user) ? $user : $user?.id;

        return Membership.find({ userId })
            .unexpired()
            .populate('registrations')
            .sort({ endDate: 1 });
    },

    async findUserMembership($user) {
        const memberships = await this.findUserMemberships($user);
        const activeMembership = memberships.find(m => m.isActive);

        return activeMembership || memberships[0];
    },

    async getMembership($membership) {
        const membership = await Membership.resolve($membership).populate('registrations');

        if (!membership) throw {
            status: 404,
            message: 'Абонемент не найден'
        };

        return membership;
    },

    async createPayment({
        email,
        name,
        userId,
        packId,
        meetingId,
        requestId,
        utm
    } = {}) {
        const pack = await this.getPack(packId);
        const user = await User.findOne({ $or: [{ _id: userId }, { email }] });
        const userEmail = user?.email ?? email;

        if (userId && !user) throw {
            code: 404,
            message: 'Пользователь не найден'
        };

        if (!userEmail) throw {
            code: 400,
            message: 'Не указан email'
        };

        if (requestId) {
            await Request.update(requestId, {
                status: Request.Status.Completed
            });

            requestId = await Request.create({
                description: 'Покупка абонемента',
                contact: user ? undefined : {
                    email: userEmail,
                    name: user?.name ?? name
                },
                learnerId: user?.id,
                utm
            });
        }

        return Checkout.createPayment({
            amount: pack.price,
            description: 'Покупка абонемента',
            confirmation: {
                type: 'embedded'
            },
            email: userEmail,
            metadata: {
                email: user ? undefined : email,
                name: user ? undefined : name,
                userId: user?.id,
                packId: pack.id,
                meetingId,
                requestId
            }
        });
    },

    async processPayment(payment) {
        if (!payment) throw {
            code: 404,
            message: 'Платеж не найден'
        };

        if (!payment.paid) throw {
            code: 400,
            message: 'Платеж не оплачен'
        };

        const user = payment.metadata.userId
            ? await User.findOne({
                $or: [
                    { _id: payment.metadata.userId },
                    { email: payment.metadata.email }
                ]
            })
            : await this.registerUser({
                name: payment.metadata.name,
                email: payment.metadata.email
            });

        if (!user) throw {
            code: 404,
            message: 'Пользователь не найден'
        };

        if (!payment.userId) {
            await Payment.update(payment.id, { userId: user.id });
        }

        await this.createMembership(user.id, payment.metadata.membershipPackId, payment.id);

        if (payment.metadata.meetingId) {
            await this.registerForMeeting(user, payment.metadata.meetingId);
        }

        if (payment.metadata.requestId) {
            const request = await Request.update(payment.metadata.requestId, {
                status: Request.Status.Completed,
                learnerId: user.id
            });

            if (request?.requestId) {
                await Request.update(request.requestId, {
                    status: Request.Status.Completed,
                    learnerId: user.id
                });
            }
        }
    },

    findMeetings(...args) {
        return Meeting.find(...args);
    },

    findScheduledMeetings(...args) {
        return Meeting.getScheduled(...args);
    },

    findMeeting(...args) {
        const [id, ...rest] = args;

        return (isObjectIdOrHexString(id) ?
            Meeting.findById(id, ...rest) :
            Meeting.findOne(...args)
        ).populate('host', 'firstname lastname image role');
    },

    async getMeeting($meeting, options = {}) {
        const query = Meeting.findById($meeting)
            .populate('host', 'firstname lastname image role');

        if (options.populate) {
            query.populate(options.populate);
        }

        const meeting = await query;

        if (!meeting) throw {
            status: 404,
            message: 'Встреча не найдена'
        };

        return meeting;
    },

    async createMeeting(data, ...args) {
        if (data.online) {
            const zoomMeetingData = await zoom.meetings.create({
                topic: data.title,
                start_time: data.date,
                duration: data.duration,
                timezone: undefined,
                settings: {
                    join_before_host: false,
                    waiting_room: false,
                    approval_type: 0, // automatically approve
                    close_registration: true,
                    registrants_email_notification: false
                }
            });

            Object.assign(data, {
                zoomId: zoomMeetingData.id,
                startUrl: zoomMeetingData.start_url,
                joinUrl: zoomMeetingData.join_url,
                password: zoomMeetingData.password
            });
        }

        console.log('Data', data);

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
        const registrations = await Registration.find({
            meetingId: meeting.id
        });

        const deletedRegistrations = await Promise.all(
            registrations.map(registration => this.deleteRegistration(meeting, registration))
        );

        const messages = deletedRegistrations.map(registration => ({
            to: {
                name: `${registration.user.firstname} ${registration.user.lastname}`,
                email: registration.user.email
            },
            subject: 'Отмена встречи',
            templateId: emailTemplates.MEETING_CANCELED,
            variables: {
                firstname: registration.user.firstname,
                title: meeting.title,
                datetime: meeting.datetime,
                host: `${meeting.host.firstname} ${meeting.host.lastname}`,
                level: meeting.level,
                thumbnailUrl: meeting.thumbnailUrl || ''
            }
        }));

        await Mail.sendMany(messages);

        return meeting;
    },

    async deleteMeeting($meeting) {
        const meeting = this.getMeeting($meeting).populate('registrations');

        if (meeting.hasRegistrants) throw {
            status: 400,
            message: 'Невозможно удалить встречу, т.к. в ней есть зарегистрировавшиеся участники'
        };

        if (meeting.zoomId) {
            await zoom.meetings.update(meeting.zoomId);
        }

        return Meeting.findByIdAndDelete(meeting.id);
    },

    async registerForMeeting($user, $meeting, options = {
        approve: false,
        force: false,
        notify: true
    }) {
        const user = await this.getUser($user);
        const meeting = await this.getMeeting($meeting);
        const membership = await this.findUserMembership(user);

        let registration = await Registration.findOne({
            meetingId: meeting.id,
            userId: user.id
        });

        this.checkRegistration(user, meeting, membership, registration, options.force);

        if (!registration) {
            registration = await this.createRegistration(meeting, user, membership);
        }

        if (
            membership ||
            options.approve ||
            options.force ||
            (meeting.isFree && registration.isCanceled)
        ) {
            registration = await this.approveRegistration(meeting, registration, membership);
        }

        if (options.notify) {
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
        const meeting = await this.getMeeting($meeting);
        const registration = await this.getRegistration({
            meetingId: meeting.id,
            userId: $user?.id ?? $user
        });

        if (registration.isCanceled) throw {
            status: 400,
            message: 'Регистрация уже отменена'
        };

        if (registration.isConfirmed) throw {
            status: 400,
            message: 'Отменить подтвержденную регистрацию нельзя'
        };

        if (meeting.zoomId && registration.zoomId) {
            await zoom.meetings.removeRegistrant(meeting.zoomId, registration.zoomId);
        }

        const canceledRegistration = await this.cancelRegistration(meeting, registration);

        return canceledRegistration;
    },

    async canRegisterForMeeting($user, $meeting) {
        const user = await this.getUser($user);
        const meeting = await this.getMeeting($meeting);
        const membership = await this.findUserMembership(user);
        const registration = meeting.findRegistrationByUser(user);

        try {
            this.checkRegistration(user, meeting, membership, registration);

            return true;
        } catch {
            return false;
        }
    },

    checkRegistration(user, meeting, membership, registration, force = false) {
        if (registration && !registration.isCanceled) throw {
            status: 409,
            message: 'Пользователь уже зарегистрирован на встречу'
        };

        if (force || meeting.isFree) return;

        if (!membership) throw {
            status: 402,
            message: 'Нет абонемента'
        };

        if (membership.isExpired) throw {
            status: 402,
            message: 'Срок действия абонемента истек'
        };

        if (!membership.isValid) throw {
            status: 402,
            message: 'Лимит посещений абонемента исчерпан'
        };
    },

    async getRegistration($registration) {
        const registration = await Registration.resolve($registration);

        if (!registration) throw {
            status: 404,
            message: 'Регистрация на встречу не найдена'
        };

        return registration;
    },

    async getRegistrationByUser($user) {
        const registration = await Registration.findOneByUser($user);

        if (!registration) throw {
            status: 404,
            message: 'Регистрация на встречу не найдена'
        };

        return registration;
    },

    async createRegistration($meeting, $user, membership, { status } = { status: 'pending' }) {
        const meeting = await this.getMeeting($meeting);
        const user = await this.getUser($user);

        const registration = new Registration({
            status,
            free: meeting.isFree,
            meetingId: meeting.id,
            userId: user.id,
            membershipId: membership?.id
        });

        if (meeting.zoomId) {
            const { join_url, registrant_id } = await zoom.meetings.addRegistrant(meeting.zoomId, {
                email: user.email,
                first_name: user.firstname,
                last_name: user.lastname
            });

            registration.zoomId = registrant_id;
            registration.joinUrl = join_url;
        }

        return Registration.create(registration);
    },

    async updateRegistration($meeting, $registration, data = {}) {
        const meeting = await this.getMeeting($meeting);
        const registration = await this.getRegistration($registration);

        if (meeting.zoomId && registration.zoomId && data.status) {
            await zoom.meetings.updateRegistrantStatus(meeting.zoomId, {
                action: registrationStatusToAction[data.status],
                registrants: [{
                    id: registration.zoomId
                }]
            });
        }

        return Registration.findByIdAndUpdate(registration.id, {
            ...data,
            free: meeting.free
        }, { new: true });
    },

    async deleteRegistration($meeting, $registration) {
        const meeting = await this.getMeeting($meeting);
        const registration = await this.getRegistration($registration);

        if (registration.zoomId) {
            await zoom.meetings.removeRegistrant(meeting.zoomId, registration.zoomId);
        }

        const deletedRegistration = await Registration.findByIdAndDelete(registration._id);

        if (registration.membershipId) {
            await Membership.updateOne({
                _id: registration.membershipId
            }, {
                $pull: { registrationIds: deletedRegistration._id }
            });
        }

        return deletedRegistration;
    },

    async approveRegistration($meeting, $registration, membership) {
        const meeting = await this.getMeeting($meeting);
        const registration = await this.getRegistration($registration);

        const approvedRegistration = await this.updateRegistration(meeting, registration.id, {
            status: 'approved',
            membershipId: membership?.id
        });

        if (!meeting.isFree && approvedRegistration.membershipId) {
            await Membership.updateOne({
                _id: approvedRegistration.membershipId
            }, {
                $addToSet: { registrationIds: registration._id }
            });
        }

        return approvedRegistration;
    },

    async cancelRegistration($meeting, $registration) {
        const meeting = await this.getMeeting($meeting);
        const registration = await this.getRegistration($registration);

        const canceledRegistration = await this.updateRegistration(meeting, registration.id, {
            status: 'canceled',
            membershipId: null
        });

        if (registration.membershipId) {
            await Membership.updateOne({
                _id: registration.membershipId
            }, {
                $pull: { registrationIds: registration._id }
            });
        }

        canceledRegistration.membershipId = registration.membershipId;

        return canceledRegistration;
    },

    async sendMeetingsReminders(when, { templateId } = {}) {
        const meetings = await Meeting.find({
            date: when instanceof Date ? when : when.toDate()
        })
            .populate('host', 'firstname lastname')
            .populate({
                path: 'registrations',
                populate: {
                    path: 'user',
                    select: 'firstname lastname email'
                }
            });

        const messages = meetings.reduce((messages, meeting) => [
            ...messages,
            ...meeting.registrations
                .filter(registration => registration.isApproved)
                .map(registration => ({
                    to: {
                        name: `${registration.user.firstname} ${registration.user.lastname}`,
                        email: registration.user.email
                    },
                    subject: 'Напоминание о встрече',
                    templateId,
                    variables: {
                        firstname: registration.user.firstname,
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