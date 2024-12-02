import expect from 'expect';

import { mock } from '../../helpers';
import context from '../context';
import { DEFAULT_MEETING, DEFAULT_TICKET, USER } from '../data';

import api from './api';

const {
    models: { Meeting, Ticket, User },
    services: { Club, Mail }
} = context;

mock.method(Mail, 'send', async () => {});
mock.method(Mail, 'sendMany', async () => {});

describe('Club Meetings API', () => {
    after(async () => {
        await Meeting.deleteMany();
        await Ticket.deleteMany();
        await User.deleteMany();
    });

    describe('meetings', () => {
        describe('GET /', () => {
            it('returns a list of meetings', async () => {
                await Meeting.create([
                    DEFAULT_MEETING,
                    DEFAULT_MEETING
                ]);

                const { body } = await api.get('/meetings');

                expect(body.data.length).toBe(2);
            });
        });

        describe('POST /', () => {
            it('creates a new meeting', async () => {
                const { body } = await api.post('/meetings').send(DEFAULT_MEETING);

                expect(body.data.title).toBe(DEFAULT_MEETING.title);
            });
        });
    });

    describe('meeting', () => {
        let meeting;

        beforeEach(async () => {
            await Meeting.deleteMany();
            meeting = await Meeting.create(DEFAULT_MEETING);
        });

        describe('GET /:meetingId', () => {
            it('returns a meeting by id', async () => {
                const { body } = await api.get(`/meetings/${meeting.id}`);

                expect(body.ok).toBe(true);
                expect(body.data.title).toBe(DEFAULT_MEETING.title);
            });

            it('returns 404 for a non-existing meeting', async () => {
                const { body, status } = await api.get('/meetings/674a0327d5971734378f5e3f');

                expect(status).toBe(404);
                expect(body.ok).toBe(false);
                expect(body.error).toBe('Встреча не найдена');
            });
        });

        describe('PUT /:meetingId', () => {
            it('updates a meeting by id', async () => {
                const data = { title: 'Updated Meeting' };

                const { body } = await api.put(`/meetings/${meeting.id}`).send(data);

                expect(body.data.title).toBe(data.title);
            });
        });

        describe('DELETE /:meetingId', () => {
            it('deletes a meeting by id', async () => {
                const { body } = await api.delete(`/meetings/${meeting.id}`);

                expect(body.data.id).toBe(meeting.id);
            });
        });
    });

    describe('meeting registrations', () => {
        let meeting;
        let ticket;
        let user;

        before(async () => {
            user = await User.create(USER.toObject());
        });

        beforeEach(async () => {
            await Meeting.deleteMany();
            await Ticket.deleteMany();
            meeting = await Meeting.create(DEFAULT_MEETING);
            ticket = await Ticket.create({ ...DEFAULT_TICKET, userId: user.id });
        });

        describe('POST /:meetingId/registrations', () => {
            it('adds a registration', async () => {
                const { body } = await api.post(`/meetings/${meeting.id}/registrations`);

                expect(body.data.isApproved).toBe(true);
            });

            it('adds a registration with the force flag', async () => {
                const { body } = await api.post(`/meetings/${meeting.id}/registrations`).send({
                    force: true
                });

                expect(body.data.isApproved).toBe(true);
            });

            it('returns an error when registration fails', async () => {
                await Ticket.updateOne({ _id: ticket.id }, { $set: { userId: null } });
                const { body } = await api.post(`/meetings/${meeting.id}/registrations`);

                expect(body.error).toExist();
            });
        });

        describe('PATCH /:meetingId/registrations/:registrationId', () => {
            it('updates a registration by id', async () => {
                const registration = await Club.registerForMeeting(user, meeting);
                const data = { status: 'approved' };

                const { body } = await api.patch(`/meetings/${meeting.id}/registrations/${registration.id}`).send(data);

                expect(body.data.status).toBe(data.status);
            });

            it('returns an error for a non-existing registration', async () => {
                const { body, status } = await api.patch(`/meetings/${meeting.id}/registrations/674a0327d5971734378f5e3f`).send({});

                expect(status).toBe(404);
                expect(body.error).toExist();
            });
        });

        describe('DELETE /:meetingId/registrations/:registrationId', () => {
            it('deletes a registration by id', async () => {
                const registration = await Club.registerForMeeting(user, meeting);

                const { body } = await api.delete(`/meetings/${meeting.id}/registrations/${registration.id}`);

                expect(body.data.id).toBe(registration.id);
            });

            it('returns an error for a non-existing registration', async () => {
                const { body, status } = await api.delete(`/meetings/${meeting.id}/registrations/674a0327d5971734378f5e3f`);

                expect(status).toBe(404);
                expect(body.error).toExist();
            });
        });
    });
});