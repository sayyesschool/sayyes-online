import { rejects } from 'node:assert/strict';

import expect from 'expect';
import { model } from 'mongoose';

import { DataSchema } from 'core/models/data';
import { MeetingSchema } from 'core/models/meeting';
import { MembershipSchema } from 'core/models/membership';
import { RegistrationSchema } from 'core/models/registration';
import { UserSchema } from 'core/models/user';
import AuthService from 'core/services/Auth';
import ClubService from 'core/services/Club';

import datetime from 'shared/libs/datetime';

import {
    DEFAULT_MEETING,
    FREE_MEETING,
    MEMBERSHIP_ALMOST_FULL,
    MEMBERSHIP_DEFAULT,
    MEMBERSHIP_EXPIRED,
    MEMBERSHIP_EXPIRING_IN_1_DAY,
    MEMBERSHIP_EXPIRING_IN_3_DAYS,
    MEMBERSHIP_FULL,
    PACKS,
    PACKS_MAP,
    USER,
    ZOOM_MEETING
} from 'test/data';
import {
    Mail,
    Newsletter,
    Zoom
} from 'test/mocks';
import { config } from 'test/func/context';

const Data = model('Data', DataSchema);
const Meeting = model('Meeting', MeetingSchema);
const Membership = model('Membership', MembershipSchema);
const Registration = model('Registration', RegistrationSchema);
const User = model('User', UserSchema);

const Auth = AuthService({
    models: { User },
    services: { Mail }
});
const Club = ClubService({
    config,
    clients: { zoom: Zoom },
    models: { Data, Meeting, Registration, Membership, User },
    services: {
        Auth,
        Mail,
        Newsletter
    }
});

describe('ClubService', () => {
    let user;

    before(async () => {
        await User.deleteMany({});
        user = await User.create(USER);
    });

    beforeEach(() => {
        Mail.sendMany.reset();
    });

    afterEach(async () => {
        await Data.deleteMany({});
        await Meeting.deleteMany({});
        await Registration.deleteMany({});
        await Membership.deleteMany({});
    });

    describe('packs', () => {
        before(async () => {
            await Data.create({
                key: 'club.packs',
                value: PACKS
            });
        });

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
            it('creates a membership for 1 visit', async () => {
                const packId = PACKS_MAP[1];
                const membership = await Club.createMembership(user, packId);
                await user.populate('memberships');

                expect(membership.limit).toEqual(1);
                expect(membership.userId).toEqual(user.id);
                expect(membership.endDate).toBeA(Date);
                expect(user.memberships.map(m => m.id)).toInclude(membership.id);
            });

            for (const visits of [4, 8, 16]) {
                it(`creates a membership for ${visits} visit${visits > 1 ? 's' : ''}`, async () => {
                    const pack = await Club.getPack(PACKS_MAP[visits]);
                    const membership = await Club.createMembership(user, pack.id);
                    await user.populate('memberships');

                    expect(membership).toMatch({
                        limit: visits,
                        userId: user._id,
                        endDate: Membership.getEndDate(membership.startDate, pack)
                    });
                    expect(user.memberships.map(m => m.id)).toInclude(membership.id);
                });
            }
        });

        describe('endMemberships', () => {
            it('ends memberships that have expired', async () => {
                await Membership.create([
                    MEMBERSHIP_DEFAULT,
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
            meeting = await Club.createMeeting({
                title: 'Test Meeting'
            });
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
                    title: 'Test Meeting'
                });
            });
        });

        describe('updateMeeting', () => {
            it('updates a meeting', async () => {
                await Club.updateMeeting(meeting._id, {
                    title: 'Updated Meeting'
                });

                const updatedMeeting = await Meeting.findById(meeting._id);

                expect(updatedMeeting.title).toEqual('Updated Meeting');
            });
        });

        describe('cancelMeeting', () => {
            it('cancels a meeting', async () => {
                await Club.cancelMeeting(meeting._id);

                const updatedMeeting = await Meeting.findById(meeting._id);

                expect(updatedMeeting.status).toEqual('canceled');
            });

            it('removes registrations', async () => {});

            it('sends notifications', async () => {});
        });

        describe('deleteMeeting', () => {
            it('deletes a meeting', async () => {
                await Club.deleteMeeting(meeting._id);

                const deletedMeeting = await Meeting.findById(meeting._id);

                expect(deletedMeeting).toNotExist();
            });
        });
    });

    describe('registrations', () => {
        describe('registerForMeeting', () => {
            it('registers with a membership', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);
                const membership = await Membership.create(MEMBERSHIP_DEFAULT);

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
                const meeting = await Meeting.create(DEFAULT_MEETING);

                const registration = await Club.registerForMeeting(user, meeting, { force: true });

                expect(registration).toExist();
                expect(registration.isApproved).toBe(true);
                expect(registration.userId).toEqual(user.id);
            });

            it('registers if previously canceled', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);
                await Membership.create(MEMBERSHIP_DEFAULT);

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
                const meeting = await Meeting.create(DEFAULT_MEETING);

                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting);
                }, {
                    message: 'Нет абонемента'
                });
            });

            it('rejects if the user is already registered', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);
                await Membership.create(MEMBERSHIP_DEFAULT);
                await Club.registerForMeeting(user, meeting);

                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting);
                }, {
                    message: 'Пользователь уже зарегистрирован на встречу'
                });
            });

            it('rejects if the membership is expired', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);
                await Membership.create(MEMBERSHIP_EXPIRED);

                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting);
                }, {
                    message: 'Срок действия абонемента истек'
                });
            });

            it('rejects if the membership is full', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);
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
                const meeting = await Meeting.create(DEFAULT_MEETING);
                const membership = await Membership.create(MEMBERSHIP_DEFAULT);
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
                const meeting = await Meeting.create(DEFAULT_MEETING);
                const membership = await Membership.create(MEMBERSHIP_DEFAULT);

                const registration = await Club.createRegistration(meeting, user, membership);

                expect(registration.userId).toEqual(user.id);
                expect(registration.membershipId).toEqual(membership.id);
                expect(registration.meetingId).toEqual(meeting.id);
            });

            it('creates a registration with the status', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);
                const membership = await Membership.create(MEMBERSHIP_DEFAULT);

                const registration = await Club.createRegistration(meeting, user, membership, {
                    status: 'approved'
                });

                expect(registration.status).toEqual('approved');
            });

            it('calls Zoom API', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const membership = await Membership.create(MEMBERSHIP_DEFAULT);

                const registration = await Club.createRegistration(meeting, user, membership);

                expect(registration.zoomId).toExist();
                expect(registration.joinUrl).toExist();
                expect(Zoom.meetings.addRegistrant).toHaveBeenCalledWith(meeting.zoomId, {
                    email: user.email,
                    first_name: user.firstname,
                    last_name: user.lastname
                });
            });
        });

        describe('updateRegistration', () => {
            it('updates a registration', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const membership = await Membership.create(MEMBERSHIP_DEFAULT);
                const registration = await Club.createRegistration(meeting, user, membership);

                const updatedRegistration = await Club.updateRegistration(meeting, registration.id, {
                    status: 'pending'
                });

                expect(updatedRegistration.status).toEqual('pending');
            });

            it('calls Zoom API', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const membership = await Membership.create(MEMBERSHIP_DEFAULT);
                const registration = await Club.createRegistration(meeting, user, membership);

                await Club.updateRegistration(meeting, registration.id, {
                    status: 'canceled'
                });

                expect(Zoom.meetings.updateRegistrantStatus).toHaveBeenCalledWith(meeting.zoomId, {
                    action: 'cancel',
                    registrants: [{
                        id: registration.zoomId
                    }]
                });
            });
        });

        describe('deleteRegistration', () => {
            it('deletes a registration', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const membership = await Membership.create(MEMBERSHIP_DEFAULT);
                const registration = await Club.createRegistration(meeting, user, membership);

                const deletedRegistration = await Club.deleteRegistration(meeting, registration.id);
                const updatedMembership = await Membership.findById(membership.id);

                expect(deletedRegistration).toExist();
                expect(updatedMembership.registrationIds).toExclude(deletedRegistration.id);
            });

            it('calls Zoom API', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const membership = await Membership.create(MEMBERSHIP_DEFAULT);
                const registration = await Club.createRegistration(meeting, user, membership);

                await Club.deleteRegistration(meeting, registration.id);

                expect(Zoom.meetings.removeRegistrant).toHaveBeenCalledWith(meeting.zoomId, registration.zoomId);
            });
        });

        describe('approveRegistration', () => {
            it('approves a registration', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const membership = await Membership.create(MEMBERSHIP_DEFAULT);
                const registration = await Club.createRegistration(meeting, user, membership, {
                    status: 'pending'
                });

                const approvedRegistration = await Club.approveRegistration(meeting, registration.id);
                const updatedMembership = await Membership.findById(membership.id);

                expect(approvedRegistration.status).toEqual('approved');
                expect(updatedMembership.registrationIds).toInclude(approvedRegistration.id);
            });
        });

        describe('cancelRegistration', () => {
            it('cancels a registration', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const membership = await Membership.create(MEMBERSHIP_DEFAULT);
                const registration = await Club.createRegistration(meeting, user, membership);

                const canceledRegistration = await Club.cancelRegistration(meeting, registration.id);
                const updatedMembership = await Membership.findById(membership.id);

                expect(canceledRegistration.status).toEqual('canceled');
                expect(updatedMembership.registrationIds).toExclude(canceledRegistration.id);
            });
        });
    });

    describe('reminders', () => {
        describe('sendMeetingsReminders', () => {
            it('sends reminders for meetings in an hour', async () => {
                const nextHour = datetime().add(1, 'hour').startOf('minute').toDate();
                const meeting = await Meeting.create({
                    ...ZOOM_MEETING,
                    date: nextHour,
                    hostId: user.id
                });
                await Membership.create(MEMBERSHIP_DEFAULT);
                await Club.registerForMeeting(user, meeting);

                await Club.sendMeetingsReminders();

                expect(Mail.sendMany).toHaveBeenCalled();
            });

            it('sends reminders for meetings in a day', async () => {
                const nextDay = datetime().endOf('hour').add(1, 'day').toDate();
                const meeting = await Meeting.create({
                    ...ZOOM_MEETING,
                    date: nextDay,
                    hostId: user.id
                });
                const membership = await Membership.create(MEMBERSHIP_DEFAULT);
                await Club.createRegistration(meeting, user, membership);

                await Club.sendMeetingsReminders();

                expect(Mail.sendMany).toHaveBeenCalled();
            });
        });

        describe('sendMembershipsReminders', () => {
            it('sends reminders for memberships that are almost full', async () => {
                await Membership.create([MEMBERSHIP_DEFAULT, MEMBERSHIP_ALMOST_FULL]);

                await Club.sendMembershipsReminders();

                expect(Mail.sendMany).toHaveBeenCalled();
                expect(Mail.sendMany.calls[0].arguments[0]).toMatch([
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
                await Membership.create([MEMBERSHIP_DEFAULT, MEMBERSHIP_FULL]);

                await Club.sendMembershipsReminders();

                expect(Mail.sendMany).toHaveBeenCalled();
                expect(Mail.sendMany.calls[0].arguments[0]).toMatch([
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
                await Membership.create([MEMBERSHIP_DEFAULT, MEMBERSHIP_EXPIRING_IN_3_DAYS]);

                await Club.sendMembershipsReminders();

                expect(Mail.sendMany).toHaveBeenCalled();
                expect(Mail.sendMany.calls[0].arguments[0]).toMatch([
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
                await Membership.create([MEMBERSHIP_DEFAULT, MEMBERSHIP_EXPIRING_IN_1_DAY]);

                await Club.sendMembershipsReminders();

                expect(Mail.sendMany).toHaveBeenCalled();
                expect(Mail.sendMany.calls[0].arguments[0]).toMatch([
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
                await Membership.create([MEMBERSHIP_DEFAULT, MEMBERSHIP_EXPIRED]);

                await Club.sendMembershipsReminders();

                expect(Mail.sendMany).toHaveBeenCalled();
                expect(Mail.sendMany.calls[0].arguments[0]).toMatch([
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