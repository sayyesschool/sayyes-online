import expect from 'expect';

import { MEETING } from 'test/_data';
import { context, withMeeting, withMembership, withUser } from 'test/_env';

import api from './api';

const {
    models: { Meeting, Registration },
    services: { Club }
} = context;

describe('Club Meetings API', () => {
    const user = withUser();

    describe('meetings', () => {
        afterEach(async () => {
            await Meeting.deleteMany();
        });

        describe('GET /', () => {
            it('returns list of meetings', async () => {
                await Meeting.create([
                    MEETING,
                    MEETING
                ]);

                const { body } = await api.get('/meetings');

                expect(body.data.length).toBe(2);
            });
        });

        describe('POST /', () => {
            it('returns new meeting', async () => {
                const { body } = await api.post('/meetings').send(MEETING);

                expect(body.data).toExist();
            });
        });
    });

    describe('meeting', () => {
        const meeting = withMeeting();

        describe('GET /:meetingId', () => {
            it('returns meeting by id', async () => {
                const { body } = await api.get(`/meetings/${meeting.id}`);

                expect(body.data.title).toBe(meeting.title);
            });

            it('returns error for non-existing meeting', async () => {
                const { body, status } = await api.get('/meetings/674a0327d5971734378f5e3f');

                expect(status).toBe(404);
                expect(body.ok).toBe(false);
                expect(body.error).toBe('Встреча не найдена');
            });
        });

        describe('PUT /:meetingId', () => {
            it('updates meeting by id', async () => {
                const data = { title: 'Updated Meeting' };

                const { body } = await api.put(`/meetings/${meeting.id}`).send(data);

                expect(body.data.id).toEqual(meeting.id);
                expect(body.data.title).toEqual(data.title);
            });
        });

        describe('DELETE /:meetingId', () => {
            it('deletes meeting by id', async () => {
                const { body } = await api.delete(`/meetings/${meeting.id}`);

                expect(body.data.id).toEqual(meeting.id);
            });
        });
    });

    describe('meeting registrations', () => {
        const meeting = withMeeting();

        afterEach(async () => {
            await Registration.deleteMany();
        });

        describe('POST /:meetingId/registrations', () => {
            withMembership();

            it('returns new registration', async () => {
                const { body } = await api.post(`/meetings/${meeting.id}/registrations`);

                expect(body.data).toExist();
            });

            it('returns new registration with `force` flag', async () => {
                const { body } = await api.post(`/meetings/${meeting.id}/registrations`).send({
                    force: true
                });

                expect(body.data).toExist();
            });

            it('returns error if registration fails', async () => {
                await api.post(`/meetings/${meeting.id}/registrations`);

                const { body } = await api.post(`/meetings/${meeting.id}/registrations`);

                expect(body.error).toExist();
            });
        });

        describe('PATCH /:meetingId/registrations/:registrationId', () => {
            withMembership();

            it('returns updated registration', async () => {
                const data = { status: 'approved' };
                const registration = await Club.registerForMeeting(user.id, meeting.id);

                const { body } = await api.patch(`/meetings/${meeting.id}/registrations/${registration.id}`).send(data);

                expect(body.data).toExist();
                expect(body.data.status).toBe(data.status);
            });

            it('returns error for non-existing registration', async () => {
                const { body, status } = await api.patch(`/meetings/${meeting.id}/registrations/674a0327d5971734378f5e3f`).send({});

                expect(status).toBe(404);
                expect(body.error).toExist();
            });
        });

        describe('DELETE /:meetingId/registrations/:registrationId', () => {
            withMembership();

            it('returns deleted registration', async () => {
                const registration = await Club.registerForMeeting(user.id, meeting.id);

                const { body } = await api.delete(`/meetings/${meeting.id}/registrations/${registration.id}`);

                expect(body.data.id).toBe(registration.id);
            });

            it('returns error for non-existing registration', async () => {
                const { body, status } = await api.delete(`/meetings/${meeting.id}/registrations/674a0327d5971734378f5e3f`);

                expect(status).toBe(404);
                expect(body.error).toExist();
            });
        });
    });
});