const expect = require('expect');
const express = require('express');
const supertest = require('supertest');

const lms = require('../../../src/lms/api');

const { models: { Lesson, Room, User } } = global.$context;

const app = express();
const api = supertest(app);
const user = new User({ firstname: 'User' });

app.use(express.json());
app.use((req, res, next) => {
    req.user = user;
    next();
});
app.use(lms(global.$context));

after(async() => {
    await Lesson.deleteMany({});
    await Room.deleteMany({});
});

describe('LMS API', () => {
    describe('/lessons', () => {
        describe('GET /', () => {
            it('should return a list of user lessons', async () => {
                await Lesson.create([
                    { teacherId: user.id },
                    { teacherId: user.id },
                    { teacherId: user.id },
                ]);
    
                const { body } = await api.get('/lessons');
                    
                expect(body.data.length).toBe(3);
            });
        });
    
        describe('GET /:id', () => {
            it('should return a lesson by id', async () => {
                const lesson = await Lesson.create({ teacherId: user.id });
    
                const { body } = await api.get(`/lessons/${lesson.id}`);
                
                expect(body.data).toMatch({
                    id: lesson.id,
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
});