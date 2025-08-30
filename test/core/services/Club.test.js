import expect from 'expect';

import datetime from 'shared/libs/datetime';

import { createId, rejects } from 'test/helpers';
import {
    FREE_MEETING,
    MEETING,
    MEMBERSHIP,
    MEMBERSHIP_ALMOST_FULL,
    MEMBERSHIP_EXPIRED,
    MEMBERSHIP_EXPIRING_IN_1_DAY,
    MEMBERSHIP_EXPIRING_IN_3_DAYS,
    MEMBERSHIP_FULL,
    PACKS,
    PAID_PAYMENT,
    ZOOM_MEETING
} from 'test/_data';
import { context, withMeeting, withMembershipPacks, withUser } from 'test/_env';
import { withMailClient, withMembership, withModel, withPayment } from 'test/_env/helpers';

const {
    clients: { mail },
    models: { Enrollment, Meeting, Membership, Registration, User },
    services: { Club }
} = context;

describe('ClubService', () => {
    const user = withUser();
    withMembershipPacks();
    withMailClient();

    describe('packs', () => {
        describe('getPacks', () => {
            it('returns list of packs', async () => {
                const packs = await Club.getPacks();

                expect(packs).toBeAn(Array);
            });
        });

        describe('getPack', () => {
            it('returns pack by id', async () => {
                const pack = await Club.getPack('21dec724-4a40-48ef-9cf7-89f0fb3c4d07');

                expect(pack).toBeAn('object');
            });
        });

        describe('getPackPrice', () => {
            it('returns pack\'s price', async () => {
                const pack = await Club.getPack('21dec724-4a40-48ef-9cf7-89f0fb3c4d07');

                expect(pack.price).toBeA('number');
            });
        });
    });

    describe('members', () => {
        const user = withUser({
            firstname: 'Alice',
            email: 'alice@sayyes.school'
        });

        describe('registerUser', () => {
            it('makes user member', async () => {
                const registeredUser = await Club.registerUser(user.id);

                expect(registeredUser.isMember).toBe(true);
            });

            it('sends welcome email', async () => {
                await Club.registerUser(user.id);

                expect(mail.send).toHaveBeenCalled();
            });
        });
    });

    describe('memberships', () => {
        withModel(Membership, { cleanupAfterEach: true });

        describe('createMembership', () => {
            for (const pack of PACKS) {
                it(`creates membership with ${pack.visits} visit${pack.visits > 1 ? 's' : ''}`, async () => {
                    const membership = await Club.createMembership(user, pack.id);
                    await user.populate('memberships');

                    expect(membership.limit).toEqual(pack.visits);
                    expect(membership.userId).toEqual(user.id);
                    expect(membership.endDate).toEqual(Membership.getEndDate(membership.startDate, pack));
                    expect(user.memberships.map(m => m.id)).toInclude(membership.id);
                });
            }
        });

        describe('endMemberships', () => {
            it('ends memberships that have expired', async () => {
                await Membership.create([
                    MEMBERSHIP,
                    MEMBERSHIP_EXPIRING_IN_1_DAY,
                    MEMBERSHIP_EXPIRING_IN_3_DAYS,
                    MEMBERSHIP_EXPIRED
                ]);

                await Club.endMemberships();

                const expiredMemberships = await Membership.find({
                    active: false
                });

                expect(expiredMemberships.length).toBe(1);
                expect(expiredMemberships[0].active).toBe(false);
            });
        });
    });

    describe('payments', () => {
        const payment = withPayment(PAID_PAYMENT);
        const meeting = withMeeting();
        withModel(Membership, { cleanupAfterEach: true });
        withModel(Registration);

        describe('processPayment', () => {
            it('makes user member', async () => {
                const { userId } = await Club.processPayment(payment);

                const user = await User.findById(userId);

                expect(user.isMember).toBe(true);
            });

            it('creates membership', async () => {
                const result = await Club.processPayment(payment);

                expect(result).toExist();
                expect(result.membershipId).toExist();
                expect(result.userId).toEqual(user.id);
            });

            it('registers for meeting if `meetingId` is passed', async () => {
                payment.data.meetingId = meeting.id;

                const { membershipId, registrationId } = await Club.processPayment(payment);

                const membership = await Membership.findById(membershipId);
                const registration = await Registration.findById(registrationId);

                expect(registration).toExist();
                expect(registration.userId).toEqual(user.id);
                expect(registration.meetingId).toEqual(meeting.id);
                expect(membership.registrationIds).toInclude(registration.id);
            });
        });
    });

    describe('meetings', () => {
        describe('getMeeting', () => {
            const meeting = withMeeting();

            it('returns meeting by id', async () => {
                const foundMeeting = await Club.getMeeting(meeting.id);

                expect(foundMeeting._id).toEqual(meeting._id);
            });

            it('returns meeting by object', async () => {
                const foundMeeting = await Club.getMeeting(meeting.toObject());

                expect(foundMeeting.id).toEqual(meeting.id);
            });

            it('throws if meeting is not found', async () => {
                await rejects(async () => await Club.getMeeting(createId()), {
                    code: 404
                });
            });
        });

        describe('createMeeting', () => {
            withModel(Meeting);

            it('creates meeting', async () => {
                const meeting = await Club.createMeeting(MEETING);

                expect(meeting).toMatch({
                    title: MEETING.title
                });
            });
        });

        describe('updateMeeting', () => {
            const meeting = withMeeting();

            it('updates meeting', async () => {
                await Club.updateMeeting(meeting.id, {
                    title: 'Updated Meeting'
                });

                const updatedMeeting = await Meeting.findById(meeting.id);

                expect(updatedMeeting.title).toEqual('Updated Meeting');
            });
        });

        describe('cancelMeeting', () => {
            const meeting = withMeeting();
            withMembership();
            withModel(Registration, { cleanupAfterEach: true });

            beforeEach(async () => {
                await Club.registerForMeeting(user.id, meeting.id);
            });

            it('cancels meeting', async () => {
                const canceledMeeting = await Club.cancelMeeting(meeting.id);

                expect(canceledMeeting.status).toEqual('canceled');
            });

            it('removes registrations', async () => {
                const registrations = await Registration.find({
                    meetingId: meeting._id
                });

                await Club.cancelMeeting(meeting.id);

                for (const registration of registrations) {
                    const deletedRegistration = await Registration.findById(registration._id);

                    expect(deletedRegistration).toNotExist();
                }
            });

            it('sends email', async () => {
                await Club.cancelMeeting(meeting.id);

                expect(mail.send).toHaveBeenCalled();
            });
        });

        describe('deleteMeeting', () => {
            withMembership();
            withModel(Meeting);
            withModel(Registration);

            it('deletes meeting', async () => {
                const meeting = await Meeting.create(MEETING);
                await Club.deleteMeeting(meeting.id);

                const deletedMeeting = await Meeting.findById(meeting.id);

                expect(deletedMeeting).toNotExist();
            });

            it('throws if meeting has registrations', async () => {
                const meeting = await Meeting.create(MEETING);
                await Club.registerForMeeting(user.id, meeting.id);

                await rejects(async () => {
                    await Club.deleteMeeting(meeting.id);
                }, {
                    code: 400
                });
            });
        });
    });

    describe('registrations', () => {
        withModel(Membership, { cleanupAfterEach: true });
        withModel(Registration, { cleanupAfterEach: true });
        withModel(Enrollment, { cleanupAfterEach: true });
        const meeting = withMeeting();

        describe('registerForMeeting', () => {
            it('registers with membership', async () => {
                const membership = await Membership.create(MEMBERSHIP);

                const registration = await Club.registerForMeeting(user.id, meeting.id);

                const updatedMembership = await Membership.findById(registration.membershipId);

                expect(registration).toExist();
                expect(registration.isApproved).toBe(true);
                expect(registration.userId).toEqual(user.id);
                expect(registration.membershipId).toEqual(membership.id);
                expect(updatedMembership.registrationIds).toInclude(registration.id);
                expect(updatedMembership.isValid).toBe(true);
            });

            it('registers without membership with force flag', async () => {
                const registration = await Club.registerForMeeting(user.id, meeting.id, { force: true });

                expect(registration).toExist();
                expect(registration.isApproved).toBe(true);
                expect(registration.userId).toEqual(user.id);
            });

            it('registers without membership with active enrollment', async () => {
                await Enrollment.create({
                    learnerId: user.id,
                    status: Enrollment.Status.Active
                });

                const registration = await Club.registerForMeeting(user.id, meeting.id);

                expect(registration).toExist();
                expect(registration.isApproved).toBe(true);
                expect(registration.userId).toEqual(user.id);
            });

            it('registers if previously canceled', async () => {
                await Membership.create(MEMBERSHIP);
                const firstRegistration = await Club.registerForMeeting(user.id, meeting.id);
                const canceledRegistration = await Club.cancelRegistration(firstRegistration);

                const secondRegistration = await Club.registerForMeeting(user.id, meeting.id);

                const membership = await Membership.findById(secondRegistration.membershipId);

                expect(firstRegistration.id).toEqual(secondRegistration.id);
                expect(firstRegistration.id).toEqual(canceledRegistration.id);
                expect(secondRegistration.id).toEqual(canceledRegistration.id);
                expect(secondRegistration.userId).toEqual(user.id);
                expect(secondRegistration.membershipId).toEqual(membership.id);
                expect(secondRegistration.isApproved).toBe(true);
                expect(membership.registrationIds).toInclude(secondRegistration.id);
            });

            it('registers for free meeting', async () => {
                const meeting = await Meeting.create(FREE_MEETING);
                const registration = await Club.registerForMeeting(user.id, meeting.id);

                expect(registration.userId).toEqual(user.id);
                expect(registration.isFree).toBe(true);
            });

            it('throws if registering without membership', async () => {
                await rejects(async () => {
                    await Club.registerForMeeting(user.id, meeting.id);
                }, {
                    message: 'Нет абонемента'
                });
            });

            it('throws if registering without membership and no active enrollments', async () => {
                await Enrollment.create({
                    learnerId: user.id,
                    status: Enrollment.Status.Processing
                });

                await rejects(async () => {
                    await Club.registerForMeeting(user.id, meeting.id);
                }, {
                    message: 'Нет абонемента'
                });
            });

            it('throws if user is already registered', async () => {
                await Membership.create(MEMBERSHIP);
                await Club.registerForMeeting(user.id, meeting.id);

                await rejects(async () => {
                    await Club.registerForMeeting(user.id, meeting.id);
                }, {
                    message: 'Пользователь уже зарегистрирован на встречу'
                });
            });

            it('throws if membership is expired', async () => {
                await Membership.create(MEMBERSHIP_EXPIRED);

                await rejects(async () => {
                    await Club.registerForMeeting(user.id, meeting.id);
                }, {
                    message: 'Срок действия абонемента истек'
                });
            });

            it('throws if membership is full', async () => {
                await Membership.create(MEMBERSHIP_FULL);

                await rejects(async () => {
                    await Club.registerForMeeting(user.id, meeting.id);
                }, {
                    message: 'Лимит посещений абонемента исчерпан'
                });
            });
        });

        describe('unregisterFromMeeting', () => {
            it('unregister from meeting', async () => {
                const membership = await Membership.create(MEMBERSHIP);
                await Club.registerForMeeting(user.id, meeting.id);

                const registration = await Club.unregisterFromMeeting(user.id, meeting.id);
                const updatedMembership = await Membership.findById(membership.id);

                expect(registration).toExist();
                expect(registration.isCanceled).toBe(true);
                expect(registration.userId).toEqual(user.id);
                expect(registration.membershipId).toEqual(updatedMembership.id);
                expect(updatedMembership.isValid).toBe(true);
                expect(updatedMembership.registrationIds).toExclude(registration.id);
            });
        });

        describe('createRegistration', () => {
            it('creates registration', async () => {
                const membership = await Membership.create(MEMBERSHIP);

                const registration = await Club.createRegistration(meeting.id, user.id, membership);

                expect(registration.userId).toEqual(user.id);
                expect(registration.membershipId).toEqual(membership.id);
                expect(registration.meetingId).toEqual(meeting.id);
            });

            it('creates registration with status', async () => {
                const membership = await Membership.create(MEMBERSHIP);

                const registration = await Club.createRegistration(meeting.id, user.id, membership, {
                    status: 'approved'
                });

                expect(registration.status).toEqual('approved');
            });
        });

        describe('updateRegistration', () => {
            it('updates registration', async () => {
                const membership = await Membership.create(MEMBERSHIP);
                const registration = await Club.createRegistration(meeting.id, user.id, membership);

                const updatedRegistration = await Club.updateRegistration(registration.id, {
                    status: 'pending'
                });

                expect(updatedRegistration.status).toEqual('pending');
            });
        });

        describe('deleteRegistration', () => {
            it('deletes registration', async () => {
                const membership = await Membership.create(MEMBERSHIP);
                const registration = await Club.createRegistration(meeting.id, user.id, membership);

                const deletedRegistration = await Club.deleteRegistration(registration.id);
                const updatedMembership = await Membership.findById(membership.id);

                expect(deletedRegistration).toExist();
                expect(updatedMembership.registrationIds).toExclude(deletedRegistration.id);
            });
        });

        describe('approveRegistration', () => {
            it('approves registration', async () => {
                const membership = await Membership.create(MEMBERSHIP);
                const registration = await Club.createRegistration(meeting.id, user.id, membership, {
                    status: 'pending'
                });

                const approvedRegistration = await Club.approveRegistration(registration.id);
                const updatedMembership = await Membership.findById(membership.id);

                expect(approvedRegistration.status).toEqual('approved');
                expect(updatedMembership.registrationIds).toInclude(approvedRegistration.id);
            });
        });

        describe('cancelRegistration', () => {
            it('cancels registration', async () => {
                const membership = await Membership.create(MEMBERSHIP);
                const registration = await Club.createRegistration(meeting.id, user.id, membership);

                const canceledRegistration = await Club.cancelRegistration(registration.id);
                const updatedMembership = await Membership.findById(membership.id);

                expect(canceledRegistration.status).toEqual('canceled');
                expect(updatedMembership.registrationIds).toExclude(canceledRegistration.id);
            });
        });
    });

    describe('reminders', () => {
        describe('sendMeetingsReminders', () => {
            withModel(Meeting, { cleanupAfterEach: true });
            withModel(Registration, { cleanupAfterEach: true });

            it('sends reminders for next hour', async () => {
                const nextHour = datetime().add(1, 'hour').toDate();
                const meeting = await Meeting.create({
                    ...ZOOM_MEETING,
                    date: nextHour,
                    hostId: user.id
                });
                await Club.registerForMeeting(user, meeting, { force: true });

                await Club.sendMeetingsReminders();

                expect(mail.send).toHaveBeenCalled();
            });

            it('sends reminders for next day', async () => {
                const nextDay = datetime().add(1, 'day').toDate();
                const meeting = await Meeting.create({
                    ...ZOOM_MEETING,
                    date: nextDay,
                    hostId: user.id
                });
                await Club.registerForMeeting(user, meeting, { force: true });

                await Club.sendMeetingsReminders();

                expect(mail.send).toHaveBeenCalled();
            });
        });

        describe('sendMembershipsReminders', () => {
            withModel(Membership, { cleanupAfterEach: true });

            it('sends reminders for almost full memberships', async () => {
                await Membership.create([MEMBERSHIP, MEMBERSHIP_ALMOST_FULL]);

                await Club.sendMembershipsReminders();

                expect(mail.send).toHaveBeenCalled();
                expect(mail.send.calls[0].arguments[0]).toMatch([
                    {
                        to: { name: user.firstname, email: user.email },
                        subject: 'В вашем абонементе осталось 2 встречи',
                        templateId: Club.emailTemplates.MEMBERSHIP_ALMOST_FULL,
                        variables: {
                            firstname: user.firstname
                        }
                    }
                ]);
            });

            it('sends reminders for full memberships', async () => {
                await Membership.create([MEMBERSHIP, MEMBERSHIP_FULL]);

                await Club.sendMembershipsReminders();

                expect(mail.send).toHaveBeenCalled();
                expect(mail.send.calls[0].arguments[0]).toMatch([
                    {
                        to: { name: user.firstname, email: user.email },
                        subject: 'Ваш абонемент закончился',
                        templateId: Club.emailTemplates.MEMBERSHIP_FULL,
                        variables: {
                            firstname: user.firstname
                        }
                    }
                ]);
            });

            it('sends reminders for memberships expiring in 3 days', async () => {
                await Membership.create([MEMBERSHIP, MEMBERSHIP_EXPIRING_IN_3_DAYS]);

                await Club.sendMembershipsReminders();

                expect(mail.send).toHaveBeenCalled();
                expect(mail.send.calls[0].arguments[0]).toMatch([
                    {
                        to: { name: user.firstname, email: user.email },
                        subject: 'Ваш абонемент истекает через 3 дня',
                        templateId: Club.emailTemplates.MEMBERSHIP_EXPIRING_IN_3_DAYS,
                        variables: {
                            firstname: user.firstname
                        }
                    }
                ]);
            });

            it('sends reminders for memberships expiring in 1 day', async () => {
                await Membership.create([MEMBERSHIP, MEMBERSHIP_EXPIRING_IN_1_DAY]);

                await Club.sendMembershipsReminders();

                expect(mail.send).toHaveBeenCalled();
                expect(mail.send.calls[0].arguments[0]).toMatch([
                    {
                        to: { name: user.firstname, email: user.email },
                        subject: 'Через 24 часа действие абонемента закончится',
                        templateId: Club.emailTemplates.MEMBERSHIP_EXPIRING_IN_1_DAY,
                        variables: {
                            firstname: user.firstname
                        }
                    }
                ]);
            });

            it('sends reminders for expired memberships', async () => {
                await Membership.create([MEMBERSHIP, MEMBERSHIP_EXPIRED]);

                await Club.sendMembershipsReminders();

                expect(mail.send).toHaveBeenCalled();
                expect(mail.send.calls[0].arguments[0]).toMatch([
                    {
                        to: { name: user.firstname, email: user.email },
                        subject: 'Ваш абонемент закончился',
                        templateId: Club.emailTemplates.MEMBERSHIP_EXPIRED,
                        variables: {
                            firstname: user.firstname
                        }
                    }
                ]);
            });
        });
    });
});