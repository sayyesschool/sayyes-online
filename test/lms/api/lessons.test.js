import expect from 'expect';

import { USER_ID } from 'test/_data';
import { models } from 'test/_env';
import { withUser } from 'test/_env/helpers';

import api from './api';

const { Lesson, Room } = models;

describe('LMS Lessons API', () => {
    withUser();

    beforeEach(async () => {
        await Lesson.deleteMany();
    });

    describe('GET /', () => {
        it.skip('returns a list of user\'s lessons', async () => {
            const lessons = await Lesson.create([
                { teacherId: USER_ID },
                { teacherId: USER_ID },
                { teacherId: USER_ID }
            ]);

            const { body } = await api.get(`/lessons?teacherId=${USER_ID}`);

            expect(body.data.length).toBe(lessons.length);
        });
    });

    describe('GET /:id', () => {
        it('returns a lesson by id', async () => {
            const lesson = await Lesson.create({ teacherId: USER_ID });

            const { body } = await api.get(`/lessons/${lesson.id}`);

            expect(body.data).toMatch({
                id: lesson.id
            });
        });
    });

    describe('POST /', () => {
        it('creates a lesson', async () => {
            await Room.create({ name: 'A', active: true });

            const date = new Date(2024, 3, 4, 10);

            const { body } = await api.post('/lessons').send({
                date,
                duration: 30
            });

            expect(body.data).toMatch({
                date: date.toISOString(),
                duration: 30
            });
        });
    });

    describe('PUT /:id', () => {
        it('updates a lesson', async () => {
            const date = new Date(2024, 3, 4, 10);

            const lesson = await Lesson.create({
                date,
                duration: 60
            });

            const { body } = await api.put(`/lessons/${lesson.id}`).send({ duration: 50 });

            expect(body.data).toMatch({
                duration: 50
            });
        });
    });

    describe('DELETE /:id', () => {
        it('deletes a lesson', async () => {
            const lesson = await Lesson.create({});

            const { body } = await api.delete(`/lessons/${lesson.id}`);

            expect(body.data).toMatch({
                id: lesson.id
            });
        });
    });
});