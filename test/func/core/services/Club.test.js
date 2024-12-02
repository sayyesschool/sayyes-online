import { rejects } from 'node:assert/strict';

import expect from 'expect';
import moment from 'moment-timezone';
import { model } from 'mongoose';

import MeetingSchema from '@/core/models/meeting/Meeting';
import TicketSchema from '@/core/models/ticket/Ticket';
import UserSchema from '@/core/models/user/User';
import AuthService from '@/core/services/auth';
import ClubService from '@/core/services/Сlub';

import {
    Mail,
    Newsletter,
    Zoom
} from '../../../mocks';
import { DEFAULT_MEETING, DEFAULT_TICKET, EXPIRED_TICKET, PACKS_MAP, ZOOM_MEETING } from '../../data';

const Meeting = model('Meeting', MeetingSchema);
const Ticket = model('Ticket', TicketSchema);
const User = model('User', UserSchema);

const Auth = AuthService({ models: { User } });
const Club = ClubService({
    lib: { zoom: Zoom },
    models: { Meeting, Ticket, User },
    services: {
        Auth,
        Mail: Mail,
        Newsletter: Newsletter
    }
});

describe('ClubService', () => {
    let user;

    before(async () => {
        user = await User.create({
            firstname: 'Member',
            lastname: 'Test',
            email: 'member@sayyes.school',
            role: 'member'
        });
        Object.assign(DEFAULT_TICKET, { userId: user.id });
        Object.assign(EXPIRED_TICKET, { userId: user.id });
    });

    afterEach(async () => {
        await Meeting.deleteMany({});
        await Ticket.deleteMany({});
        await User.deleteMany({});
    });

    describe('packs', () => {
        describe('getPacks', () => {
            it('should return an array of packs', async () => {
                const packs = await Club.getPacks();

                expect(packs).toBeAn(Array);
            });
        });

        describe('getPack', () => {
            it('should return a pack by id', async () => {
                const pack = await Club.getPack('21dec724-4a40-48ef-9cf7-89f0fb3c4d07');

                expect(pack).toBeAn(Object);
            });
        });
    });

    describe('members', () => {
        describe('registerMember', () => {
            it('should create a new user with the member role', async () => {
                const email = 'bob@sayyes.school';
                const user = await Club.registerMember({
                    name: 'Bob',
                    email
                });

                expect(user.email).toEqual(email);
                expect(user.role).toEqual('member');
            });
        });
    });

    describe('tickets', () => {
        describe('createTicket', () => {
            it('should create a ticket for 1 visit', async () => {
                const packId = PACKS_MAP[1];
                const ticket = await Club.createTicket(user, packId);
                await user.populate('tickets');

                expect(ticket).toMatch({
                    limit: 1,
                    userId: user._id,
                    expiresAt: undefined
                });
                expect(user.tickets.find(t => t._id)._id).toEqual(ticket._id);
            });

            for (const visits of [4, 8, 16]) {
                it(`should create a ticket for ${visits} visit${visits > 1 ? 's' : ''}`, async () => {
                    const pack = await Club.getPack(PACKS_MAP[visits]);
                    const ticket = await Club.createTicket(user, pack.id);
                    await user.populate('tickets');

                    expect(ticket).toMatch({
                        limit: visits,
                        userId: user._id,
                        expiresAt: Ticket.getExpiration(ticket.purchasedAt, pack)
                    });
                    expect(user.tickets.find(t => t._id)._id).toEqual(ticket._id);
                });
            }
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
            it('should return a meeting by id', async () => {
                const foundMeeting = await Club.getMeeting(meeting._id);

                expect(foundMeeting._id).toEqual(meeting._id);
            });

            it('should return a meeting by object', async () => {
                const foundMeeting = await Club.getMeeting(meeting);

                expect(foundMeeting._id).toMatch(meeting._id);
            });

            it('should reject if the meeting is not found', async () => {
                await rejects(async () => {
                    await Club.getMeeting('000000000000000000000000');
                }, {
                    message: 'Встреча не найдена'
                });
            });
        });

        describe('createMeeting', () => {
            it('should create a meeting', async () => {
                expect(meeting).toMatch({
                    title: 'Test Meeting'
                });
            });
        });

        describe('updateMeeting', () => {
            it('should update a meeting', async () => {
                await Club.updateMeeting(meeting._id, {
                    title: 'Updated Meeting'
                });

                const updatedMeeting = await Meeting.findById(meeting._id);

                expect(updatedMeeting.title).toEqual('Updated Meeting');
            });
        });

        describe('cancelMeeting', () => {
            it('should cancel a meeting', async () => {
                await Club.cancelMeeting(meeting._id);

                const updatedMeeting = await Meeting.findById(meeting._id);

                expect(updatedMeeting.status).toEqual('canceled');
            });
        });

        describe('deleteMeeting', () => {
            it('should delete a meeting', async () => {
                await Club.deleteMeeting(meeting._id);

                const deletedMeeting = await Meeting.findById(meeting._id);

                expect(deletedMeeting).toNotExist();
            });
        });
    });

    describe.only('registrations', () => {
        describe('registerForMeeting', () => {
            it('registers with a ticket', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);
                await Ticket.create(DEFAULT_TICKET);

                const registration = await Club.registerForMeeting(user, meeting);
                const ticket = await Ticket.findById(registration.ticketId);

                expect(registration).toExist();
                expect(registration.isApproved).toBe(true);
                expect(registration.userId).toEqual(user.id);
                expect(registration.ticketId).toEqual(ticket.id);
                expect(ticket.meetingIds).toInclude(meeting.id);
                expect(ticket.isValid).toBe(false);
            });

            it('registers without a ticket with the force flag', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);

                const registration = await Club.registerForMeeting(user, meeting, { force: true });

                expect(registration).toExist();
                expect(registration.isApproved).toBe(true);
                expect(registration.userId).toEqual(user.id);
            });

            it('registers if previously canceled', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);
                await Ticket.create(DEFAULT_TICKET);

                const firstRegistration = await Club.registerForMeeting(user, meeting);
                const canceledRegistration = await Club.cancelRegistration(meeting, firstRegistration);
                const secondRegistration = await Club.registerForMeeting(user, meeting);
                const ticket = await Ticket.findById(secondRegistration.ticketId);

                expect(firstRegistration.id).toEqual(secondRegistration.id);
                expect(firstRegistration.id).toEqual(canceledRegistration.id);
                expect(secondRegistration.id).toEqual(canceledRegistration.id);
                expect(secondRegistration.userId).toEqual(user.id);
                expect(secondRegistration.ticketId).toEqual(ticket.id);
                expect(secondRegistration.isApproved).toBe(true);
                expect(ticket.meetingIds).toInclude(meeting.id);
            });

            it('registers for a free meeting', async () => {
                const meeting = await Meeting.create({ title: 'Test Meeting', free: true });

                const registration = await Club.registerForMeeting(user, meeting);

                expect(registration.userId).toEqual(user.id);
                expect(registration.isPending).toBe(true);
            });

            it('rejects if registering without a ticket', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);

                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting);
                }, {
                    message: 'Нет абонемента'
                });
            });

            it('rejects if the user is already registered', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);
                await Ticket.create(DEFAULT_TICKET);
                await Club.registerForMeeting(user, meeting);

                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting);
                }, {
                    message: 'Пользователь уже зарегистрирован на встречу'
                });
            });

            it('rejects if the ticket is expired', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);
                await Ticket.create(EXPIRED_TICKET);

                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting);
                }, {
                    message: 'Срок действия абонемента истек'
                });
            });

            it('rejects if the ticket has reached the limit', async () => {
                const meeting1 = await Meeting.create(DEFAULT_MEETING);
                const meeting2 = await Meeting.create(DEFAULT_MEETING);
                await Ticket.create(DEFAULT_TICKET);

                await Club.registerForMeeting(user, meeting1);

                await rejects(async () => {
                    await Club.registerForMeeting(user, meeting2);
                }, {
                    message: 'Лимит посещений абонемента исчерпан'
                });
            });
        });

        describe('unregisterFromMeeting', () => {
            it('should unregister', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);
                const ticket = await Ticket.create(DEFAULT_TICKET);
                await Club.registerForMeeting(user, meeting);

                const registration = await Club.unregisterFromMeeting(user, meeting);
                const updatedTicket = await Ticket.findById(ticket.id);

                expect(registration).toExist();
                expect(registration.isCanceled).toBe(true);
                expect(registration.userId).toEqual(user.id);
                expect(registration.ticketId).toEqual(updatedTicket.id);
                expect(updatedTicket.isValid).toBe(true);
                expect(updatedTicket.meetingIds).toExclude(meeting.id);
            });
        });

        describe('createRegistration', () => {
            it('creates a registration', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);
                const ticket = await Ticket.create(DEFAULT_TICKET);

                const registration = await Club.createRegistration(meeting, user, ticket);
                const updatedMeeting = await Meeting.findById(meeting.id);

                expect(registration.userId).toEqual(user.id);
                expect(registration.ticketId).toEqual(ticket.id);
                expect(registration.meetingId).toEqual(meeting.id);
                expect(updatedMeeting.toObject().registrations).toInclude(registration.toObject());
            });

            it('creates a registration with the the passed status', async () => {
                const meeting = await Meeting.create(DEFAULT_MEETING);
                const ticket = await Ticket.create(DEFAULT_TICKET);

                const registration = await Club.createRegistration(meeting, user, ticket, {
                    status: 'approved'
                });

                expect(registration.status).toEqual('approved');
            });

            it('calls Zoom API', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const ticket = await Ticket.create(DEFAULT_TICKET);

                const registration = await Club.createRegistration(meeting, user, ticket);

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
                const ticket = await Ticket.create(DEFAULT_TICKET);
                const registration = await Club.createRegistration(meeting, user, ticket);

                const updatedRegistration = await Club.updateRegistration(meeting, registration.id, {
                    status: 'pending'
                });

                expect(updatedRegistration.status).toEqual('pending');
            });

            it('calls Zoom API', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const ticket = await Ticket.create(DEFAULT_TICKET);
                const registration = await Club.createRegistration(meeting, user, ticket);

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
                const ticket = await Ticket.create(DEFAULT_TICKET);
                const registration = await Club.createRegistration(meeting, user, ticket);

                const deletedRegistration = await Club.deleteRegistration(meeting, registration.id);
                const updatedMeeting = await Meeting.findById(meeting.id);

                expect(deletedRegistration).toExist();
                expect(updatedMeeting.toObject().registrations).toExclude(deletedRegistration.toObject());
            });

            it('calls Zoom API', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const ticket = await Ticket.create(DEFAULT_TICKET);
                const registration = await Club.createRegistration(meeting, user, ticket);

                await Club.deleteRegistration(meeting, registration.id);

                expect(Zoom.meetings.removeRegistrant).toHaveBeenCalledWith(meeting.zoomId, registration.zoomId);
            });
        });

        describe('approveRegistration', () => {
            it('approves a registration', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const ticket = await Ticket.create(DEFAULT_TICKET);
                const registration = await Club.createRegistration(meeting, user, ticket, {
                    status: 'pending'
                });

                const approvedRegistration = await Club.approveRegistration(meeting, registration.id);
                const updatedTicket = await Ticket.findById(ticket.id);

                expect(approvedRegistration.status).toEqual('approved');
                expect(updatedTicket.meetingIds).toInclude(meeting.id);
            });
        });

        describe('cancelRegistration', () => {
            it('cancels a registration', async () => {
                const meeting = await Meeting.create(ZOOM_MEETING);
                const ticket = await Ticket.create(DEFAULT_TICKET);
                const registration = await Club.createRegistration(meeting, user, ticket);

                const canceledRegistration = await Club.cancelRegistration(meeting, registration.id);
                const updatedTicket = await Ticket.findById(ticket.id);

                expect(canceledRegistration.status).toEqual('canceled');
                expect(updatedTicket.meetingIds).toExclude(meeting.id);
            });
        });
    });

    describe('reminders', () => {
        describe('sendMeetingsReminders', () => {
            it('should send reminders for meetings in an hour', async () => {
                const nextHour = moment().add(1, 'hour');

                await Club.createMeeting({
                    title: 'Test Meeting',
                    date: nextHour.toDate()
                });

                await Club.sendMeetingsReminders(nextHour, { templateId: 1348680 });

                expect(Mail.sendMany).toHaveBeenCalled();
            });

            it('should send reminders for meetings in a day', async () => {
                const nextDay = moment().add(1, 'day');

                await Club.createMeeting({
                    title: 'Test Meeting',
                    date: nextDay.toDate()
                });

                await Club.sendMeetingsReminders(nextDay, { templateId: 1348680 });

                expect(Mail.sendMany).toHaveBeenCalled();
            });
        });
    });
});