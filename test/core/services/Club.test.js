import expect from 'expect';

import datetime from 'shared/libs/datetime';

import { rejects } from 'test/helpers';
import {
    FREE_MEETING,
    MEETING,
    MEMBERSHIP,
    MEMBERSHIP_ALMOST_FULL,
    MEMBERSHIP_EXPIRED,
    MEMBERSHIP_EXPIRING_IN_1_DAY,
    MEMBERSHIP_EXPIRING_IN_3_DAYS,
    MEMBERSHIP_FULL,
    PACK_1,
    PACKS,
    USER,
    ZOOM_MEETING
} from 'test/_data';
import { context } from 'test/_env';

const {
    clients: { mail, zoom },
    models: { Data, Meeting, Membership, Payment, Registration, Request, User },
    services: { Club }
} = context;

describe('ClubService', () => {
    let user;

    before(async () => {
        await Data.create({
            key: 'club.packs',
            value: PACKS
        });
        user = await User.create(USER);
    });

    after(async () => {
        await Data.deleteMany({});
        await Payment.deleteMany({});
        await Request.deleteMany({});
        await User.deleteMany({});
    });

    afterEach(async () => {
        await Meeting.deleteMany({});
        await Membership.deleteMany({});
        await Registration.deleteMany({});
    });

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

                expect(pack).toBeAn(Object);
            });
        });
    });

    describe('members', () => {
        describe('registerUser', () => {
            it('creates new user with member role', async () => {
                const email = 'bob@sayyes.school';
                const user = await Club.registerUser({
                    name: 'Bob',
                    email
                });

                expect(user.email).toEqual(email);
            });
        });
    });

    describe('memberships', () => {
        describe('createMembership', () => {
            for (const pack of PACKS) {
                it(`creates membership for pack with ${pack.visits} visit${pack.visits > 1 ? 's' : ''}`, async () => {
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

    describe('meetings', () => {
        let meeting;

        beforeEach(async () => {
            meeting = await Club.createMeeting(MEETING);
        });

        describe('getMeeting', () => {
            it('returns meeting by id', async () => {
                const foundMeeting = await Club.getMeeting(meeting._id);

                expect(foundMeeting._id).toEqual(meeting._id);
            });

            it('returns meeting by object', async () => {
                const foundMeeting = await Club.getMeeting(meeting);

                expect(foundMeeting._id).toMatch(meeting._id);
            });

            it('rejects if meeting is not found', async () => {
                await rejects(async () => {
                    await Club.getMeeting('000000000000000000000000');
                }, {
                    message: 'Встреча не найдена'
                });
            });
        });

        describe('createMeeting', () => {
            it('creates meeting', async () => {
                expect(meeting).toMatch({
                    title: MEETING.title
                });
            });
        });

        describe('updateMeeting', () => {
            it('updates meeting', async () => {
                await Club.updateMeeting(meeting._id, {
                    title: 'Updated Meeting'
                });

                const updatedMeeting = await Meeting.findById(meeting._id);

                expect(updatedMeeting.title).toEqual('Updated Meeting');
            });
        });

        describe('cancelMeeting', () => {
            afterEach(() => {
                mail.send.reset();
            });

            it('cancels meeting', async () => {
                const canceledMeeting = await Club.cancelMeeting(meeting._id);

                expect(canceledMeeting.status).toEqual('canceled');
            });

            it('removes registrations', async () => {
                await Club.createMembership(user.id, PACK_1.id);
                await Club.registerForMeeting(user, meeting);

                const registrations = await Registration.find({
                    meetingId: meeting._id
                });

                await Club.cancelMeeting(meeting._id);

                for (const registration of registrations) {
                    const deletedRegistration = await Registration.findById(registration._id);

                    expect(deletedRegistration).toNotExist();
                }
            });

            it('sends email', async () => {
                await Club.registerForMeeting(user, meeting, { force: true });

                await Club.cancelMeeting(meeting._id);

                expect(mail.send).toHaveBeenCalled();
            });
        });

        describe('deleteMeeting', () => {
            it('deletes meeting', async () => {
                await Club.deleteMeeting(meeting._id);

                const deletedMeeting = await Meeting.findById(meeting._id);

                expect(deletedMeeting).toNotExist();
            });
        });
    });

    describe('payments', () => {
        describe('createPayment', () => {
            afterEach(async () => {
                await Payment.deleteMany();
                await Request.deleteMany();
            });

            it('creates payment for new user', async () => {
                const contact = {
                    name: 'Jane Doe',
                    email: 'janedoe@mail.com',
                    phone: '+79991234567'
                };
                const payment = await Club.createPayment({
                    contact,
                    packId: PACK_1.id
                });

                expect(payment.amount).toEqual(PACK_1.price);
                expect(payment.metadata).toMatch(contact);
            });

            it('creates payment for existing user', async () => {
                const payment = await Club.createPayment({
                    userId: user.id,
                    packId: PACK_1.id
                });

                expect(payment.amount).toEqual(PACK_1.price);
                expect(payment.userId).toEqual(user.id);
            });

            it('creates request for payment', async () => {
                const payment = await Club.createPayment({
                    userId: user.id,
                    packId: PACK_1.id
                });

                const request = await Request.findById(payment.metadata.requestId);

                expect(request).toExist();
            });

            it('updates existing request', async () => {
                const request = await Request.create({});

                await Club.createPayment({
                    userId: user.id,
                    packId: PACK_1.id,
                    requestId: request.id
                });

                const updatedRequest = await Request.findById(request.id);

                expect(updatedRequest.status).toEqual(Request.Status.Completed);
            });

            it('rejects if no userId or email is passed', () => {
                rejects(async () => {
                    await Club.createPayment({
                        packId: PACK_1.id
                    });
                }, {
                    message: 'Не указан email'
                });
            });

            it('rejects if pack is not found', () => {
                rejects(async () => {
                    await Club.createPayment({
                        userId: user.id
                    });
                }, {
                    message: 'Пакет не найден'
                });
            });

            it('rejects if user is not found', () => {
                rejects(async () => {
                    await Club.createPayment({
                        userId: '000000000000000000000000',
                        packId: PACK_1.id
                    });
                }, {
                    message: 'Пользователь не найден'
                });
            });
        });

        describe('processPayment', () => {
            afterEach(async () => {
                await Payment.deleteMany();
            });

            describe('for new user only', () => {
                let payment;

                beforeEach(async () => {
                    payment = await Club.createPayment({
                        contact: {
                            name: 'Jane Doe',
                            email: 'janedoe@mail.com',
                            phone: '+79991234567'
                        },
                        packId: PACK_1.id
                    });
                    payment = await Payment.update(payment.id, {
                        status: Payment.Status.succeeded,
                        paid: true
                    }, { new: true });
                });

                it('creates user', async () => {
                    const { userId } = await Club.processPayment(payment);
                    const user = await User.findById(userId);

                    expect(user).toExist();
                });

                it('sets userId for payment', async () => {
                    const { userId } = await Club.processPayment(payment);

                    expect(payment.userId).toEqual(userId);
                });
            });

            describe('for new user or existing user', () => {
                let payment;

                beforeEach(async () => {
                    payment = await Club.createPayment({
                        userId: user.id,
                        packId: PACK_1.id
                    });
                    payment = await Payment.update(payment.id, {
                        status: Payment.Status.succeeded,
                        paid: true
                    }, { new: true });
                });

                it('creates membership', async () => {
                    const result = await Club.processPayment(payment);

                    expect(result).toExist();
                    expect(result.paymentId).toEqual(payment.id);
                    expect(result.userId).toEqual(user.id);
                });

                it('registers for meeting if meetingId is passed', async () => {
                    const meeting = await Meeting.create(MEETING);
                    payment = await Payment.update(payment.id, {
                        'metadata.meetingId': meeting.id
                    }, { new: true });

                    const { membershipId, registrationId } = await Club.processPayment(payment);

                    const membership = await Membership.findById(membershipId);
                    const registration = await Registration.findById(registrationId);

                    expect(registration).toExist();
                    expect(registration.userId).toEqual(user.id);
                    expect(registration.meetingId).toEqual(meeting.id);
                    expect(membership.registrationIds).toInclude(registration.id);
                });

                it('updates request if requestId is passed', async () => {
                    const { requestId } = await Club.processPayment(payment);

                    const updatedRequest = await Request.findById(requestId);

                    expect(updatedRequest.status).toEqual(Request.Status.Completed);
                });

                it('updates another request if requestId is passed', async () => {
                    const request = await Request.create({});

                    await Request.update(payment.metadata.requestId, {
                        requestId: request.id
                    });

                    await Club.processPayment(payment);

                    const updatedRequest = await Request.findById(request.id);

                    expect(updatedRequest.status).toEqual(Request.Status.Completed);
                });

                it('marks payment as processed', async () => {
                    const { paymentId } = await Club.processPayment(payment);

                    const updatedPayment = await Payment.findById(paymentId);

                    expect(updatedPayment).toExist();
                    expect(updatedPayment.isProcessed).toBe(true);
                });

                it('rejects if payment is not found', async () => {
                    await rejects(async () => {
                        await Club.processPayment();
                    }, {
                        message: 'Платеж не найден'
                    });
                });

                it('rejects if payment is not paid', async () => {
                    payment = await Payment.update(payment.id, {
                        paid: false
                    }, { new: true });

                    await rejects(async () => {
                        await Club.processPayment(payment);
                    }, {
                        message: 'Платеж не оплачен'
                    });
                });

                it('rejects if user is not found', async () => {
                    payment = await Payment.update(payment.id, {
                        userId: '000000000000000000000000'
                    }, { new: true });

                    await rejects(async () => {
                        await Club.processPayment(payment);
                    }, {
                        message: 'Пользователь не найден'
                    });
                });
            });
        });
    });

    describe('registrations', () => {
        let meeting;

        beforeEach(async () => {
            meeting = await Meeting.create(MEETING);
        });

        describe('registerForMeeting', () => {
            it('registers with membership', async () => {
                const membership = await Membership.create(MEMBERSHIP);

                const registration = await Club.registerForMeeting(user, meeting);
                const updatedMembership = await Membership.findById(registration.membershipId);

                expect(registration).toExist();
                expect(registration.isApproved).toBe(true);
                expect(registration.userId).toEqual(user.id);
                expect(registration.membershipId).toEqual(membership.id);
                expect(updatedMembership.registrationIds).toInclude(registration.id);
                expect(updatedMembership.isValid).toBe(true);
            });

            it('registers without membership with force flag', async () => {
                const registration = await Club.registerForMeeting(user, meeting, { force: true });

                expect(registration).toExist();
                expect(registration.isApproved).toBe(true);
                expect(registration.userId).toEqual(user.id);
            });

            it('registers if previously canceled', async () => {
                await Membership.create(MEMBERSHIP);

                const firstRegistration = await Club.registerForMeeting(user, meeting);
                const canceledRegistration = await Club.cancelRegistration(meeting, firstRegistration);
                const secondRegistration = await Club.registerForMeeting(user, meeting);
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

                const registration = await Club.registerForMeeting(user, meeting);

                expect(registration.userId).toEqual(user.id);
                expect(registration.isPending).toBe(true);
            });

            it('rejects if registering without membership', async () => {
                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting);
                }, {
                    message: 'Нет абонемента'
                });
            });

            it('rejects if user is already registered', async () => {
                await Membership.create(MEMBERSHIP);
                await Club.registerForMeeting(user, meeting);

                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting);
                }, {
                    message: 'Пользователь уже зарегистрирован на встречу'
                });
            });

            it('rejects if membership is expired', async () => {
                await Membership.create(MEMBERSHIP_EXPIRED);

                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting);
                }, {
                    message: 'Срок действия абонемента истек'
                });
            });

            it('rejects if membership is full', async () => {
                await Membership.create(MEMBERSHIP_FULL);

                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting);
                }, {
                    message: 'Лимит посещений абонемента исчерпан'
                });
            });
        });

        describe('unregisterFromMeeting', () => {
            it('unregister from meeting', async () => {
                const membership = await Membership.create(MEMBERSHIP);
                await Club.registerForMeeting(user, meeting);

                const registration = await Club.unregisterFromMeeting(user, meeting);
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

                const registration = await Club.createRegistration(meeting, user, membership);

                expect(registration.userId).toEqual(user.id);
                expect(registration.membershipId).toEqual(membership.id);
                expect(registration.meetingId).toEqual(meeting.id);
            });

            it('creates registration with status', async () => {
                const membership = await Membership.create(MEMBERSHIP);

                const registration = await Club.createRegistration(meeting, user, membership, {
                    status: 'approved'
                });

                expect(registration.status).toEqual('approved');
            });

            it('calls Zoom API', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const membership = await Membership.create(MEMBERSHIP);

                const registration = await Club.createRegistration(meeting, user, membership);

                expect(registration.zoomId).toExist();
                expect(registration.joinUrl).toExist();
                expect(zoom.meetings.addRegistrant).toHaveBeenCalledWith(meeting.zoomId, {
                    email: user.email,
                    first_name: user.firstname,
                    last_name: user.lastname
                });
            });
        });

        describe('updateRegistration', () => {
            it('updates registration', async () => {
                const membership = await Membership.create(MEMBERSHIP);
                const registration = await Club.createRegistration(meeting, user, membership);

                const updatedRegistration = await Club.updateRegistration(meeting, registration.id, {
                    status: 'pending'
                });

                expect(updatedRegistration.status).toEqual('pending');
            });

            it('calls Zoom API', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const membership = await Membership.create(MEMBERSHIP);
                const registration = await Club.createRegistration(meeting, user, membership);

                await Club.updateRegistration(meeting, registration.id, {
                    status: 'canceled'
                });

                expect(zoom.meetings.updateRegistrantStatus).toHaveBeenCalledWith(meeting.zoomId, {
                    action: 'cancel',
                    registrants: [{
                        id: registration.zoomId
                    }]
                });
            });
        });

        describe('deleteRegistration', () => {
            it('deletes registration', async () => {
                const membership = await Membership.create(MEMBERSHIP);
                const registration = await Club.createRegistration(meeting, user, membership);

                const deletedRegistration = await Club.deleteRegistration(meeting, registration.id);
                const updatedMembership = await Membership.findById(membership.id);

                expect(deletedRegistration).toExist();
                expect(updatedMembership.registrationIds).toExclude(deletedRegistration.id);
            });

            it('calls Zoom API', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const membership = await Membership.create(MEMBERSHIP);
                const registration = await Club.createRegistration(meeting, user, membership);

                await Club.deleteRegistration(meeting, registration.id);

                expect(zoom.meetings.removeRegistrant).toHaveBeenCalledWith(meeting.zoomId, registration.zoomId);
            });
        });

        describe('approveRegistration', () => {
            it('approves registration', async () => {
                const membership = await Membership.create(MEMBERSHIP);
                const registration = await Club.createRegistration(meeting, user, membership, {
                    status: 'pending'
                });

                const approvedRegistration = await Club.approveRegistration(meeting, registration.id);
                const updatedMembership = await Membership.findById(membership.id);

                expect(approvedRegistration.status).toEqual('approved');
                expect(updatedMembership.registrationIds).toInclude(approvedRegistration.id);
            });

            it('calls Zoom API', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const membership = await Membership.create(MEMBERSHIP);
                const registration = await Club.createRegistration(meeting, user, membership);

                await Club.updateRegistration(meeting, registration.id, {
                    status: 'approved'
                });

                expect(zoom.meetings.updateRegistrantStatus).toHaveBeenCalledWith(meeting.zoomId, {
                    action: 'approve',
                    registrants: [{
                        id: registration.zoomId
                    }]
                });
            });
        });

        describe('cancelRegistration', () => {
            it('cancels registration', async () => {
                const membership = await Membership.create(MEMBERSHIP);
                const registration = await Club.createRegistration(meeting, user, membership);

                const canceledRegistration = await Club.cancelRegistration(meeting, registration.id);
                const updatedMembership = await Membership.findById(membership.id);

                expect(canceledRegistration.status).toEqual('canceled');
                expect(updatedMembership.registrationIds).toExclude(canceledRegistration.id);
            });

            it('calls Zoom API', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const membership = await Membership.create(MEMBERSHIP);
                const registration = await Club.createRegistration(meeting, user, membership);

                await Club.updateRegistration(meeting, registration.id, {
                    status: 'canceled'
                });

                expect(zoom.meetings.updateRegistrantStatus).toHaveBeenCalledWith(meeting.zoomId, {
                    action: 'cancel',
                    registrants: [{
                        id: registration.zoomId
                    }]
                });
            });
        });
    });

    describe('reminders', () => {
        beforeEach(() => {
            mail.send.reset();
        });

        describe('sendMeetingsReminders', () => {
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