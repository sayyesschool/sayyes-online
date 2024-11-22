import { rejects } from 'node:assert/strict';

import expect from 'expect';
import moment from 'moment-timezone';
import { model } from 'mongoose';

import MeetingSchema from '@/core/models/meeting/Meeting.js';
import TicketSchema from '@/core/models/ticket/Ticket.js';
import UserSchema from '@/core/models/user/User.js';
import Auth from '@/core/services/auth.js';
import Club from '@/core/services/club.js';

import MailMock from '../../../mocks/mail.js';
import NewsletterMock from '../../../mocks/newsletter.js';
import ZoomMock from '../../../mocks/zoom.js';

const Meeting = model('Meeting', MeetingSchema);
const Ticket = model('Ticket', TicketSchema);
const User = model('User', UserSchema);
const auth = Auth({ models: { User } });

const club = Club({
    lib: { zoom: ZoomMock },
    models: { Meeting, Ticket, User },
    services: {
        Auth: auth,
        Mail: MailMock,
        Newsletter: NewsletterMock
    }
});

const packsMap = {
    1: '21dec724-4a40-48ef-9cf7-89f0fb3c4d07',
    4: '3f7eb11c-12c5-4631-af4a-39855ca17810',
    8: '3d678c9b-632d-492a-aaad-e1ced4f35255',
    16: '8012db3e-b720-48ea-95a9-ba42772da33d'
};

describe('ClubService', () => {
    let user;

    before(async () => {
        user = await User.create({
            firstname: 'Member',
            lastname: 'Test',
            email: 'member@sayyes.school',
            role: 'member'
        });
    });

    afterEach(async () => {
        await Meeting.deleteMany({});
        await Ticket.deleteMany({});
        await User.deleteMany({});
    });

    describe('packs', () => {
        describe('getPacks', () => {
            it('should return an array of packs', async () => {
                const packs = await club.getPacks();

                expect(packs).toBeAn(Array);
            });
        });

        describe('getPack', () => {
            it('should return a pack by id', async () => {
                const pack = await club.getPack('21dec724-4a40-48ef-9cf7-89f0fb3c4d07');

                expect(pack).toBeAn(Object);
            });
        });
    });

    describe('members', () => {
        describe('registerMember', () => {
            it('should create a new user with the member role', async () => {
                const email = 'bob@sayyes.school';
                const user = await club.registerMember({
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
                const packId = packsMap[1];
                const ticket = await club.createTicket(user, packId);
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
                    const pack = await club.getPack(packsMap[visits]);
                    const ticket = await club.createTicket(user, pack.id);
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
            meeting = await club.createMeeting({
                title: 'Test Meeting'
            });
        });

        describe('getMeeting', () => {
            it('should return a meeting by id', async () => {
                const foundMeeting = await club.getMeeting(meeting._id);

                expect(foundMeeting._id).toEqual(meeting._id);
            });

            it('should return a meeting by object', async () => {
                const foundMeeting = await club.getMeeting(meeting);

                expect(foundMeeting._id).toMatch(meeting._id);
            });

            it('should reject if the meeting is not found', async () => {
                await rejects(async () => {
                    await club.getMeeting('000000000000000000000000');
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
                await club.updateMeeting(meeting._id, {
                    title: 'Updated Meeting'
                });

                const updatedMeeting = await Meeting.findById(meeting._id);

                expect(updatedMeeting.title).toEqual('Updated Meeting');
            });
        });

        describe('cancelMeeting', () => {
            it('should cancel a meeting', async () => {
                await club.cancelMeeting(meeting._id);

                const updatedMeeting = await Meeting.findById(meeting._id);

                expect(updatedMeeting.status).toEqual('canceled');
            });
        });

        describe('deleteMeeting', () => {
            it('should delete a meeting', async () => {
                await club.deleteMeeting(meeting._id);

                const deletedMeeting = await Meeting.findById(meeting._id);

                expect(deletedMeeting).toNotExist();
            });
        });
    });

    describe('registrations', () => {
        describe('registerForMeeting', () => {
            it('should register a user with a ticket for a meeting', async () => {
                const meeting = await club.createMeeting({
                    title: 'Test Meeting'
                });
                const ticket = await club.createTicket(user, packsMap[1]);

                const [updatedMeeting, updatedTicket] = await club.registerForMeeting(user, meeting, ticket);
                const registration = updatedMeeting.findRegistrationByUser(user);

                expect(registration).toExist();
                expect(updatedTicket.meetingIds.includes(updatedMeeting._id)).toBe(true);
                expect(updatedTicket.isValid).toBe(false);
            });

            it('should reject if the user is already registered for the meeting', async () => {
                const meeting = await club.createMeeting({
                    title: 'Test Meeting'
                });
                const ticket = await club.createTicket(user, packsMap[1]);

                await club.registerForMeeting(user, meeting, ticket);

                await rejects(async () => {
                    await club.registerForMeeting(user, meeting, ticket);
                }, {
                    message: 'Пользователь уже зарегистрирован на встречу'
                });
            });

            it('should reject without a ticket', async () => {
                const meeting = await club.createMeeting({
                    title: 'Test Meeting'
                });

                await rejects(async () => {
                    await club.registerForMeeting(user, meeting);
                }, {
                    message: 'Билет не найден'
                });
            });

            it('should reject if the ticket is not valid', async () => {
                const meeting = await club.createMeeting({
                    title: 'Test Meeting'
                });
                const ticket = await club.createTicket(user, packsMap[4]);

                ticket.expiresAt = moment().subtract(1, 'day');

                await ticket.save();

                await rejects(async () => {
                    await club.registerForMeeting(user, meeting, ticket);
                }, {
                    message: 'Для регистрации на встречу необходимо купить новый билет'
                });
            });
        });

        describe('unregisterFromMeeting', () => {
            it('should unregister a user from a meeting', async () => {
                const meeting = await club.createMeeting({
                    title: 'Test Meeting',
                    date: moment().add(1, 'day').toDate()
                });
                const ticket = await club.createTicket(user, packsMap[1]);
                await club.registerForMeeting(user, meeting, ticket);

                const [updatedMeeting, updatedTicket] = await club.unregisterFromMeeting(user, meeting);
                const registration = updatedMeeting.findRegistrationByUser(user);

                expect(registration).toNotExist();
                expect(updatedTicket.meetingIds.includes(updatedMeeting._id)).toBe(false);
                expect(updatedTicket.isValid).toBe(true);
            });
        });

        describe('createRegistration', () => {
            it('should create a registration', async () => {
                const meeting = await club.createMeeting({
                    title: 'Test Meeting'
                });
                const ticket = await club.createTicket(user, packsMap[1]);

                const registration = await club.createRegistration(user, ticket, meeting);

                expect(meeting.registrations).toInclude(registration);
                expect(registration).toMatch({
                    userId: user._id,
                    ticketId: ticket._id,
                    meetingId: meeting._id
                });
            });
        });

        describe('updateRegistration', () => {
            it('should update a registration', async () => {
                const meeting = await club.createMeeting({
                    title: 'Test Meeting'
                });
                const ticket = await club.createTicket(user, packsMap[1]);
                const registration = await club.createRegistration(user, ticket, meeting);

                await club.updateRegistration(meeting, registration.id, {
                    status: 'approved'
                });

                const updatedMeeting = await club.findMeeting({ _id: meeting._id }, 'registrations');
                const updatedRegistration = updatedMeeting
                    .findRegistrationById(registration._id);

                expect(updatedRegistration.status).toEqual('approved');
            });
        });

        describe('approveRegistration', () => {
            it('should approve a registration', async () => {
                const meeting = await club.createMeeting({
                    title: 'Test Meeting'
                });
                const ticket = await club.createTicket(user, packsMap[1]);
                const registration = await club.createRegistration(user, ticket, meeting);

                await club.approveRegistration(meeting, registration.id);

                const updatedMeeting = await club.findMeeting({ _id: meeting._id }, 'registrations');
                const updatedRegistration = updatedMeeting
                    .findRegistrationById(registration._id);

                expect(updatedRegistration.status).toEqual('approved');
            });
        });

        describe('cancelRegistration', () => {
            it('should cancel a registration', async () => {
                const meeting = await club.createMeeting({
                    title: 'Test Meeting'
                });
                const ticket = await club.createTicket(user, packsMap[1]);
                const registration = await club.createRegistration(user, ticket, meeting);

                await club.cancelRegistration(meeting, registration.id);

                const updatedMeeting = await club.findMeeting({ _id: meeting._id }, 'registrations');
                const updatedRegistration = updatedMeeting
                    .findRegistrationById(registration._id);

                expect(updatedRegistration.status).toEqual('canceled');
            });
        });

        describe('denyRegistration', () => {
            it('should deny a registration', async () => {
                const meeting = await club.createMeeting({
                    title: 'Test Meeting'
                });
                const ticket = await club.createTicket(user, packsMap[1]);
                const registration = await club.createRegistration(user, ticket, meeting);

                await club.denyRegistration(meeting, registration.id);

                const updatedMeeting = await club.findMeeting({ _id: meeting._id }, 'registrations');
                const updatedRegistration = updatedMeeting
                    .findRegistrationById(registration._id);

                expect(updatedRegistration.status).toEqual('denied');
            });
        });

        describe('deleteRegistration', () => {
            it('should delete a registration', async () => {
                const meeting = await club.createMeeting({
                    title: 'Test Meeting'
                });
                const ticket = await club.createTicket(user, packsMap[1]);
                const registration = await club.createRegistration(user, ticket, meeting);

                await club.deleteRegistration(meeting, registration.id);

                const updatedMeeting = await club.findMeeting({ _id: meeting._id }, 'registrations');
                const deletedRegistration = updatedMeeting
                    .findRegistrationById(registration._id);

                expect(updatedMeeting.registrations).toExclude(deletedRegistration);
                expect(deletedRegistration).toNotExist();
            });
        });
    });

    describe('reminders', () => {
        describe('sendMeetingsReminders', () => {
            it('should send reminders for meetings in an hour', async () => {
                const nextHour = moment().add(1, 'hour');

                await club.createMeeting({
                    title: 'Test Meeting',
                    date: nextHour.toDate()
                });

                await club.sendMeetingsReminders(nextHour, { templateId: 1348680 });

                expect(MailMock.sendMany).toHaveBeenCalled();
            });

            it('should send reminders for meetings in a day', async () => {
                const nextDay = moment().add(1, 'day');

                await club.createMeeting({
                    title: 'Test Meeting',
                    date: nextDay.toDate()
                });

                await club.sendMeetingsReminders(nextDay, { templateId: 1348680 });

                expect(MailMock.sendMany).toHaveBeenCalled();
            });
        });
    });
});