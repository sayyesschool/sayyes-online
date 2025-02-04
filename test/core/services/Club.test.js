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
    PACKS,
    PACKS_MAP,
    USER,
    ZOOM_MEETING } from 'test/_data';
import { context } from 'test/_env';

const {
    clients: { mail, zoom },
    models: { Data, Meeting, Membership, Registration, User },
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
        await Data.deleteMany();
        await User.deleteMany({});
    });

    afterEach(async () => {
        await Meeting.deleteMany({});
        await Registration.deleteMany({});
        await Membership.deleteMany({});
    });

    describe('packs', () => {
        describe('getPacks', () => {
            it('returns a list of packs', async () => {
                const packs = await Club.getPacks();

                expect(packs).toBeAn(Array);
            });
        });

        describe('getPack', () => {
            it('returns a pack by id', async () => {
                const pack = await Club.getPack('21dec724-4a40-48ef-9cf7-89f0fb3c4d07');

                expect(pack).toBeAn(Object);
            });
        });
    });

    describe('members', () => {
        describe('registerUser', () => {
            it('creates a new user with the member role', async () => {
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
            for (const visits of [1, 4, 8, 16]) {
                it(`creates a membership for ${visits} visit${visits > 1 ? 's' : ''}`, async () => {
                    const pack = await Club.getPack(PACKS_MAP[visits]);
                    const membership = await Club.createMembership(user, pack.id);
                    await user.populate('memberships');

                    expect(membership.limit).toEqual(visits);
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
            it('returns a meeting by id', async () => {
                const foundMeeting = await Club.getMeeting(meeting._id);

                expect(foundMeeting._id).toEqual(meeting._id);
            });

            it('returns a meeting by object', async () => {
                const foundMeeting = await Club.getMeeting(meeting);

                expect(foundMeeting._id).toMatch(meeting._id);
            });

            it('rejects if the meeting is not found', async () => {
                await rejects(async () => {
                    await Club.getMeeting('000000000000000000000000');
                }, {
                    message: 'Встреча не найдена'
                });
            });
        });

        describe('createMeeting', () => {
            it('creates a meeting', async () => {
                expect(meeting).toMatch({
                    title: MEETING.title
                });
            });
        });

        describe('updateMeeting', () => {
            it('updates the meeting', async () => {
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

            it('cancels the meeting', async () => {
                const canceledMeeting = await Club.cancelMeeting(meeting._id);

                expect(canceledMeeting.status).toEqual('canceled');
            });

            it('removes the registrations', async () => {
                await Club.createMembership(user.id, PACKS_MAP[1]);
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

            it('sends an email', async () => {
                await Club.cancelMeeting(meeting._id);

                expect(mail.send).toHaveBeenCalled();
            });
        });

        describe('deleteMeeting', () => {
            it('deletes a meeting', async () => {
                await Club.deleteMeeting(meeting._id);

                const deletedMeeting = await Meeting.findById(meeting._id);

                expect(deletedMeeting).toNotExist();
            });
        });
    });

    describe('payments', () => {
        describe.skip('createPayment', () => {});

        describe.skip('processPayment', () => {
            it('creates a membership');

            it('updates the payment if it came from a user');

            it('registers for a meeting if meetingId is present');

            it('updates the associated request if requestId is present');

            it('updates another request if requestId is present');

            it('rejects in payment is not found', () => {});

            it('rejects if payment is not paid', () => {});

            it('rejects if user is not found');
        });
    });

    describe('registrations', () => {
        let meeting;

        beforeEach(async () => {
            meeting = await Meeting.create(MEETING);
        });

        describe('registerForMeeting', () => {
            it('registers with a membership', async () => {
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

            it('registers without a membership with the force flag', async () => {
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

            it('registers for a free meeting', async () => {
                const meeting = await Meeting.create(FREE_MEETING);

                const registration = await Club.registerForMeeting(user, meeting);

                expect(registration.userId).toEqual(user.id);
                expect(registration.isPending).toBe(true);
            });

            it('rejects if registering without a membership', async () => {
                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting);
                }, {
                    message: 'Нет абонемента'
                });
            });

            it('rejects if the user is already registered', async () => {
                await Membership.create(MEMBERSHIP);
                await Club.registerForMeeting(user, meeting);

                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting);
                }, {
                    message: 'Пользователь уже зарегистрирован на встречу'
                });
            });

            it('rejects if the membership is expired', async () => {
                await Membership.create(MEMBERSHIP_EXPIRED);

                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting);
                }, {
                    message: 'Срок действия абонемента истек'
                });
            });

            it('rejects if the membership is full', async () => {
                await Membership.create(MEMBERSHIP_FULL);

                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting);
                }, {
                    message: 'Лимит посещений абонемента исчерпан'
                });
            });
        });

        describe('unregisterFromMeeting', () => {
            it('unregister from a meeting', async () => {
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
            it('creates a registration', async () => {
                const membership = await Membership.create(MEMBERSHIP);

                const registration = await Club.createRegistration(meeting, user, membership);

                expect(registration.userId).toEqual(user.id);
                expect(registration.membershipId).toEqual(membership.id);
                expect(registration.meetingId).toEqual(meeting.id);
            });

            it('creates a registration with the status', async () => {
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
            it('updates a registration', async () => {
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
            it('deletes a registration', async () => {
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
            it('approves a registration', async () => {
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
            it('cancels a registration', async () => {
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
        afterEach(() => {
            mail.send.reset();
        });

        describe('sendMeetingsReminders', () => {
            it('sends reminders for meetings in an hour', async () => {
                const nextHour = datetime().add(1, 'hour').startOf('minute').toDate();
                const meeting = await Meeting.create({
                    ...ZOOM_MEETING,
                    date: nextHour,
                    hostId: user.id
                });
                await Membership.create(MEMBERSHIP);
                await Club.registerForMeeting(user, meeting);

                await Club.sendMeetingsReminders();

                expect(mail.send).toHaveBeenCalled();
            });

            it('sends reminders for meetings in a day', async () => {
                const nextDay = datetime().endOf('hour').add(1, 'day').toDate();
                const meeting = await Meeting.create({
                    ...ZOOM_MEETING,
                    date: nextDay,
                    hostId: user.id
                });
                const membership = await Membership.create(MEMBERSHIP);
                await Club.createRegistration(meeting, user, membership);

                await Club.sendMeetingsReminders();

                expect(mail.send).toHaveBeenCalled();
            });
        });

        describe('sendMembershipsReminders', () => {
            it('sends reminders for memberships that are almost full', async () => {
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

            it('sends reminders for memberships that are full', async () => {
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

            it('sends reminders for memberships that are expiring in 3 days', async () => {
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

            it('sends reminders for memberships that are expiring in 1 day', async () => {
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

            it('sends reminders for memberships that have expired', async () => {
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