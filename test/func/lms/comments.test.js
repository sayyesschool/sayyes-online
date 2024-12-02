import expect from 'expect';

import context from '../context';
import { USER_ID } from '../data';

import api from './api';

const {
    models: { Lesson, Room }
} = context;

describe('/comments', () => {
    describe('GET /', () => {
        it('should return a list of user\'s lessons', async () => {
            await Lesson.create([
                { teacherId: USER_ID },
                { teacherId: USER_ID },
                { teacherId: USER_ID }
            ]);

            const { body } = await api.get('/lessons');

            expect(body.data.length).toBe(3);
        });
    });

    describe('GET /:id', () => {
        it('should return a lesson by id', async () => {
            const lesson = await Lesson.create({ teacherId: USER_ID });

            const { body } = await api.get(`/lessons/${lesson.id}`);

            expect(body.data).toMatch({
                id: lesson.id
            });
        });
    });

    describe('POST /', () => {
        it('should create a lesson', async () => {
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
        it('should update a lesson', async () => {
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
        it('should delete a lesson', async () => {
            const lesson = await Lesson.create({});

            const { body } = await api.delete(`/lessons/${lesson.id}`);

            expect(body.data).toMatch({
                id: lesson.id
            });
        });
    });
});