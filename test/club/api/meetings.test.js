import expect from 'expect';

import { MEETING, MEMBERSHIP, USER } from 'test/_data';
import { context } from 'test/_env';

import api from './api';

const {
    models: { Meeting, Membership, Registration, User },
    services: { Club }
} = context;

describe('Club Meetings API', () => {
    after(async () => {
        await Meeting.deleteMany();
        await Registration.deleteMany();
        await Membership.deleteMany();
        await User.deleteMany();
    });

    describe('meetings', () => {
        describe('GET /', () => {
            it('returns a list of meetings', async () => {
                await Meeting.create([
                    MEETING,
                    MEETING
                ]);

                const { body } = await api.get('/meetings');

                expect(body.data.length).toBe(2);
            });
        });

        describe('POST /', () => {
            it('creates a new meeting', async () => {
                const { body } = await api.post('/meetings').send(MEETING);

                expect(body.data.title).toBe(MEETING.title);
            });
        });
    });

    describe('meeting', () => {
        let meeting;

        beforeEach(async () => {
            await Meeting.deleteMany();
            meeting = await Meeting.create(MEETING);
        });

        describe('GET /:meetingId', () => {
            it('returns a meeting by id', async () => {
                const { body } = await api.get(`/meetings/${meeting.id}`);

                expect(body.ok).toBe(true);
                expect(body.data.title).toBe(MEETING.title);
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
        let user;
        let meeting;
        let membership;

        before(async () => {
            user = await User.create(USER);
        });

        beforeEach(async () => {
            await Meeting.deleteMany();
            await Membership.deleteMany();
            await Registration.deleteMany();
            meeting = await Meeting.create(MEETING);
            membership = await Membership.create({ ...MEMBERSHIP, userId: user.id });
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
                await Membership.updateOne({ _id: membership.id }, { $set: { userId: null } });
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