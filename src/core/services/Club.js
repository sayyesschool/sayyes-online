import { isObjectIdOrHexString } from 'mongoose';

import datetime, { toMSKString } from 'shared/libs/datetime';
import { getWordEnding } from 'shared/utils/format';

const CLUB_NAME = 'SAY YES Speaking Club';
const ALMOST_FULL_LIMIT_DIFFERENCE = 2;

const emailTemplates = {
    MEMBER_REGISTERED: 6476492,
    MEMBERSHIP_PURCHASED: 6476579,
    MEMBERSHIP_ALMOST_FULL: 6678353,
    MEMBERSHIP_FULL: 6678427,
    MEMBERSHIP_EXPIRING_IN_3_DAYS: 6678353,
    MEMBERSHIP_EXPIRING_IN_1_DAY: 6678353,
    MEMBERSHIP_EXPIRED: 6678427,
    MEETING_CANCELED: 1111111,
    MEETING_FEEDBACK: 6476574,
    MEETING_REGISTRATION_ONLINE: 6476555,
    MEETING_REGISTRATION_OFFLINE: 6476558,
    MEETING_REGISTRATION_DENIED: 6476560,
    MEETING_REMINDER_24H: 6476571,
    MEETING_REMINDER_1H: 6476573
};

const durationLabels = {
    week: ['неделя', 'недели', 'недель'],
    month: ['месяц', 'месяца', 'месяцев']
};

export default ({
    config,
    clients: { zoom },
    models: { Data, Enrollment, Meeting, Membership, Registration },
    services: { Auth, Mail, Newsletter }
}) => ({
    clubName: CLUB_NAME,
    clubEmail: `club@${config.EMAIL_DOMAIN}`,
    clubUrl: `https://club.${config.APP_DOMAIN}`,
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
            code: 404,
            message: 'Пакет не найден'
        };

        return pack;
    },

    async getPackPrice(packId) {
        const pack = await this.getPack(packId);

        return pack.price;
    },

    async registerUser($user) {
        const user = await Auth.getUser($user);
        const password = Auth.generatePassword();

        user.password = password;
        user.domains.addToSet('club');

        const updatedUser = await user.save();

        await Mail.send([
            {
                subject: 'Добро пожаловать в Разговорный клуб SAY YES!',
                to: {
                    name: user.fullname,
                    email: user.email
                },
                from: {
                    email: this.clubEmail,
                    name: this.clubName
                },
                templateId: emailTemplates.MEMBER_REGISTERED,
                variables: {
                    name: user.firstname,
                    email: user.email,
                    password,
                    clubUrl: this.clubUrl,
                    clubEmail: this.clubEmail
                }
            },
            {
                subject: 'Пользователь зарегистрировался в разговорном клубе',
                to: this.clubEmail,
                html: `Имя: ${user.firstname}\nEmail: ${user.email}`
            }
        ]);

        Newsletter.subscribe({
            name: user.firstname,
            email: user.email,
            action: 'addnoforce'
        });

        return updatedUser;
    },

    async createMembership($user, $pack, paymentId) {
        const user = await Auth.getUser($user);
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

    async endMemberships() {
        return Membership.updateMany({
            active: true,
            endDate: {
                $lt: new Date()
            }
        }, {
            active: false
        });
    },

    async findUserMemberships($user) {
        const userId = isObjectIdOrHexString($user) ? $user : $user?.id;
        const memberships = await Membership.find({ userId })
            .populate('registrations')
            .sort({ endDate: 1 });
        const activeEnrollments = !memberships.find(m => m.isValid)
            ? await Enrollment.find({
                learnerId: userId,
                status: Enrollment.Status.Active
            })
            : [];

        if (memberships.length === 0 && activeEnrollments.length > 0) {
            memberships.push(new Membership({
                limit: null,
                userId,
                registrations: []
            }));
        }

        return memberships;
    },

    async findUserMembership($user) {
        const memberships = await this.findUserMemberships($user);
        const validMembership = memberships.find(m => m.isValid);

        return validMembership || memberships[0];
    },

    async getMembership($membership) {
        const membership = await Membership.resolve($membership).populate('registrations');

        if (!membership) throw {
            code: 404,
            message: 'Абонемент не найден'
        };

        return membership;
    },

    async processPayment(payment) {
        const user = await Auth.getUser(payment.userId);

        if (!user.isMember) {
            await this.registerUser(user);
        }

        const membership = await this.createMembership(user.id, payment.data.packId, payment.id);
        const registration = payment.data.meetingId
            ? await this.registerForMeeting(user, payment.data.meetingId)
            : null;

        return {
            userId: user.id,
            membershipId: membership.id,
            registrationId: registration?.id
        };
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

        if (
            typeof options.populate === 'string' ||
            typeof options.populate === 'object'
        ) {
            query.populate(options.populate);
        } else if (Array.isArray(options.populate)) {
            options.populate.forEach(populate => query.populate(populate));
        }

        const meeting = await query;

        if (!meeting) throw {
            code: 404,
            message: 'Встреча не найдена'
        };

        return meeting;
    },

    async createMeeting(data, ...args) {
        if (data.online) {
            const zoomMeetingData = await zoom.meetings.create({
                topic: data.title,
                start_time: toMSKString(data.startDate),
                duration: data.duration,
                timezone: 'Europe/Moscow',
                settings: {
                    join_before_host: false,
                    waiting_room: false
                }
            });

            Object.assign(data, {
                zoomId: zoomMeetingData.id,
                startUrl: zoomMeetingData.start_url,
                joinUrl: zoomMeetingData.join_url,
                password: zoomMeetingData.password
            });
        }

        const meeting = await Meeting.create(data, ...args);

        return meeting.populate('host', 'firstname lastname image role');
    },

    async updateMeeting(id, data, options = {}, ...args) {
        const meeting = await Meeting.findByIdAndUpdate(id, data, {
            new: true,
            ...options
        }, ...args);

        if (meeting.zoomId) {
            await zoom.meetings.update(meeting.zoomId, {
                topic: meeting.title,
                agenda: meeting.description,
                start_time: toMSKString(meeting.startDate),
                timezone: 'Europe/Moscow',
                duration: meeting.duration
            });
        }

        return meeting.populate('host', 'firstname lastname image role');
    },

    async cancelMeeting(id) {
        const meeting = await Meeting.findByIdAndUpdate(id, {
            status: 'canceled'
        }, { new: true });

        const registrations = await Registration.find({
            meetingId: meeting.id
        });

        const deletedRegistrations = await Promise.all(
            registrations.map(registration => this.deleteRegistration(registration))
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
                datetime: meeting.datetime
            }
        }));

        await Mail.send(messages);

        return meeting;
    },

    async deleteMeeting($meeting) {
        const meeting = await this.getMeeting($meeting, {
            populate: 'registrations'
        });

        if (meeting.hasRegistrations) throw {
            code: 400,
            message: 'Невозможно удалить встречу, т.к. в ней есть зарегистрировавшиеся участники'
        };

        if (meeting.zoomId) {
            await zoom.meetings.delete(meeting.zoomId);
        }

        return Meeting.findByIdAndDelete(meeting.id);
    },

    async registerForMeeting($user, $meeting, options = {
        approve: false,
        force: false,
        notify: true
    }) {
        const user = await Auth.getUser($user);
        const meeting = await this.getMeeting($meeting);
        const membership = await this.findUserMembership(user);
        let registration = await Registration.findOne({
            meetingId: meeting.id,
            userId: user.id
        });

        this.checkRegistration(
            meeting,
            membership,
            registration,
            options.force
        );

        if (!registration) {
            registration = await this.createRegistration(user, meeting, membership);
        }

        if (
            membership ||
            options.approve ||
            options.force ||
            (meeting.isFree && registration.isCanceled)
        ) {
            registration = await this.approveRegistration(registration, membership);
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

        return registration.populate({
            path: 'user',
            select: 'firstname lastname email'
        });
    },

    async unregisterFromMeeting($user, $meeting) {
        const meeting = await this.getMeeting($meeting);
        const registration = await this.getRegistration({
            meetingId: meeting.id,
            userId: $user?.id ?? $user
        });

        if (registration.isCanceled) throw {
            code: 400,
            message: 'Регистрация уже отменена'
        };

        if (registration.isConfirmed) throw {
            code: 400,
            message: 'Отменить подтвержденную регистрацию нельзя'
        };

        const canceledRegistration = await this.cancelRegistration(registration);

        return canceledRegistration;
    },

    async canRegisterForMeeting($user, $meeting) {
        const user = await Auth.getUser($user);
        const meeting = await this.getMeeting($meeting);
        const membership = await this.findUserMembership(user);
        const registration = meeting.findRegistrationByUser(user);

        try {
            this.checkRegistration(
                meeting,
                membership,
                registration
            );

            return true;
        } catch {
            return false;
        }
    },

    checkRegistration(meeting, membership, registration, force = false) {
        console.log('checkRegistration', membership);

        if (registration && !registration.isCanceled) throw {
            code: 409,
            message: 'Пользователь уже зарегистрирован на встречу'
        };

        if (force || meeting.isFree) return;

        if (!membership) throw {
            code: 402,
            message: 'Нет абонемента'
        };

        if (membership.isExpired) throw {
            code: 402,
            message: 'Срок действия абонемента истек'
        };

        if (membership.isFull) throw {
            code: 402,
            message: 'Лимит посещений абонемента исчерпан'
        };
    },

    async getRegistration($registration) {
        const registration = await Registration.resolve($registration);

        if (!registration) throw {
            code: 404,
            message: 'Регистрация на встречу не найдена'
        };

        return registration;
    },

    async getRegistrationByUser($user) {
        const registration = await Registration.findOneByUser($user);

        if (!registration) throw {
            code: 404,
            message: 'Регистрация на встречу не найдена'
        };

        return registration;
    },

    async createRegistration($user, $meeting, membership, { status } = {}) {
        const user = await Auth.getUser($user);
        const meeting = await this.getMeeting($meeting);

        console.log('createRegistration', membership);

        return Registration.create({
            status,
            joinUrl: meeting.joinUrl,
            meetingId: meeting.id,
            membershipId: (meeting.free || membership.isUnlimited)
                ? undefined
                : membership?.id,
            userId: user.id
        });
    },

    async updateRegistration($registration, data = {}) {
        const registration = await this.getRegistration($registration);

        return Registration.findByIdAndUpdate(registration.id, data, { new: true });
    },

    async deleteRegistration($registration) {
        const registration = await this.getRegistration($registration);

        const deletedRegistration = await Registration.findByIdAndDelete(registration._id);

        if (registration.membershipId) {
            await Membership.updateOne({
                _id: registration.membershipId
            }, {
                $pull: { registrationIds: deletedRegistration._id }
            });
        }

        return deletedRegistration.populate({
            path: 'user',
            select: 'firstname lastname email',
            options: { lean: true }
        });
    },

    async approveRegistration($registration, membership) {
        const registration = await this.getRegistration($registration);
        const meeting = await this.getMeeting(registration.meetingId);

        const approvedRegistration = await this.updateRegistration(registration.id, {
            status: 'approved',
            membershipId: (meeting.isFree || membership.isUnlimited)
                ? undefined
                : membership?.id
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

    async cancelRegistration($registration) {
        const registration = await this.getRegistration($registration);

        const canceledRegistration = await this.updateRegistration(registration.id, {
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

    async endMeetings() {
        await Meeting.updateMany({
            status: { $in: [Meeting.Status.Scheduled, Meeting.Status.Started] },
            endDate: { $lt: new Date() }
        }, {
            status: Meeting.Status.Ended
        });
    },

    async sendMeetingsReminders() {
        const now = datetime().utc().seconds(0).milliseconds(0);
        const nextHour = now.clone().add(1, 'hour');
        const nextDay = now.clone().add(1, 'day');

        const meetingsStartingInHour = await Meeting.find({
            startDate: {
                $gte: nextHour.startOf('minute').toDate(),
                $lt: nextHour.endOf('minute').toDate()
            }
        }).populate({
            path: 'host',
            select: 'firstname lastname',
            options: { lean: true }
        }).populate({
            path: 'registrations',
            match: {
                status: 'approved'
            },
            populate: {
                path: 'user',
                select: 'firstname lastname email',
                options: { lean: true }
            }
        });

        const meetingsStartingInDay = await Meeting.find({
            startDate: {
                $gte: nextDay.startOf('minute').toDate(),
                $lt: nextDay.endOf('minute').toDate()
            }
        }).populate({
            path: 'host',
            select: 'firstname lastname',
            options: { lean: true }
        }).populate({
            path: 'registrations',
            match: {
                status: 'approved'
            },
            populate: {
                path: 'user',
                select: 'firstname lastname email',
                options: { lean: true }
            }
        });

        const messages = [
            ...meetingsStartingInHour.flatMap(m => m.registrations.map(r => ({
                registration: r.toJSON(),
                meeting: m.toJSON(),
                templateId: emailTemplates.MEETING_REMINDER_1H
            }))),
            ...meetingsStartingInDay.flatMap(m => m.registrations.map(r => ({
                registration: r.toJSON(),
                meeting: m.toJSON(),
                templateId: emailTemplates.MEETING_REMINDER_24H
            })))
        ].map(({ registration, meeting, templateId }) => ({
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
                host: meeting.host && `${meeting.host.firstname} ${meeting.host.lastname}`,
                level: meeting.level,
                thumbnailUrl: meeting.thumbnailUrl || '',
                materialsUrl: meeting.materialsUrl || '',
                joinUrl: registration.joinUrl
            }
        }));

        await Mail.send(messages);
    },

    async sendMembershipsReminders() {
        const now = new Date();

        const almostFullMemberships = await Membership.getAlmostFullMemberships({
            limitDifference: ALMOST_FULL_LIMIT_DIFFERENCE
        }, {
            'notifications.almostFull': { $exists: false }
        });

        const fullMemberships = await Membership.getFullMemberships({
            'notifications.full': { $exists: false }
        });

        const membershipsExpiringIn3Days = await Membership.find()
            .expiringIn(3, 'days')
            .where({ 'notifications.expiringIn3Days': { $exists: false } })
            .withUser();

        const membershipsExpiringIn1Day = await Membership.find()
            .expiringIn(1, 'days')
            .where({ 'notifications.expiringIn1Day': { $exists: false } })
            .withUser();

        const expiredMemberships = await Membership.find()
            .expired()
            .where({ 'notifications.expired': { $exists: false } })
            .withUser();

        const almostFullMessages = almostFullMemberships.map(m => ({
            to: {
                name: m.user.firstname,
                email: m.user.email
            },
            subject: `В вашем абонементе осталось ${ALMOST_FULL_LIMIT_DIFFERENCE} встречи`,
            templateId: emailTemplates.MEMBERSHIP_ALMOST_FULL,
            variables: {
                firstname: m.user.firstname,
                clubUrl: this.clubUrl
            }
        }));

        const fullMessages = fullMemberships.map(m => ({
            to: {
                name: m.user.firstname,
                email: m.user.email
            },
            subject: 'Ваш абонемент закончился',
            templateId: emailTemplates.MEMBERSHIP_FULL,
            variables: {
                firstname: m.user.firstname,
                clubUrl: this.clubUrl
            }
        }));

        const messagesExpiringIn3Days = membershipsExpiringIn3Days.map(m => ({
            to: {
                name: m.user.firstname,
                email: m.user.email
            },
            subject: 'Ваш абонемент истекает через 3 дня',
            templateId: emailTemplates.MEMBERSHIP_EXPIRING_IN_3_DAYS,
            variables: {
                firstname: m.user.firstname,
                clubUrl: this.clubUrl
            }
        }));

        const messagesExpiringIn1Day = membershipsExpiringIn1Day.map(m => ({
            to: {
                name: m.user.firstname,
                email: m.user.email
            },
            subject: 'Через 24 часа действие абонемента закончится',
            templateId: emailTemplates.MEMBERSHIP_EXPIRING_IN_1_DAY,
            variables: {
                firstname: m.user.firstname,
                clubUrl: this.clubUrl
            }
        }));

        const expiredMessages = expiredMemberships.map(m => ({
            to: {
                name: m.user.firstname,
                email: m.user.email
            },
            subject: 'Ваш абонемент закончился',
            templateId: emailTemplates.MEMBERSHIP_EXPIRED,
            variables: {
                firstname: m.user.firstname,
                clubUrl: this.clubUrl
            }
        }));

        await Mail.send([
            ...almostFullMessages,
            ...fullMessages,
            ...messagesExpiringIn3Days,
            ...messagesExpiringIn1Day,
            ...expiredMessages
        ]);

        if (almostFullMemberships.length > 0) {
            await Membership.updateMany(
                { _id: { $in: almostFullMemberships.map(m => m._id) } },
                { 'notifications.almostFull': now }
            );
        }

        if (fullMemberships.length > 0) {
            await Membership.updateMany(
                { _id: { $in: fullMemberships.map(m => m._id) } },
                { 'notifications.full': now }
            );
        }

        if (membershipsExpiringIn3Days.length > 0) {
            await Membership.updateMany(
                { _id: { $in: membershipsExpiringIn3Days.map(m => m._id) } },
                { 'notifications.expiringIn3Days': now }
            );
        }

        if (membershipsExpiringIn1Day.length > 0) {
            await Membership.updateMany(
                { _id: { $in: membershipsExpiringIn1Day.map(m => m._id) } },
                { 'notifications.expiringIn1Day': now }
            );
        }

        if (expiredMemberships.length > 0) {
            await Membership.updateMany(
                { _id: { $in: expiredMemberships.map(m => m._id) } },
                { 'notifications.expired': now }
            );
        }

        return {
            almostFullCount: almostFullMemberships.length,
            fullCount: fullMemberships.length,
            expiringIn3DaysCount: membershipsExpiringIn3Days.length,
            expiringIn1DayCount: membershipsExpiringIn1Day.length,
            expiredCount: expiredMemberships.length
        };
    }
});