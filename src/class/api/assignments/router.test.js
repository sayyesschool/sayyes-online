import expect from 'expect';
import express, { json } from 'express';
import { stub } from 'sinon';
import test from 'supertest';

import router from './router';

const context = global.$context;
const Assignment = stub(context.models.Assignment);

context.models.Assignment = Assignment;

const app = test(
    express()
        .use(json())
        .use(router(context))
);

describe('Assignment router', () => {
    describe('GET /', () => {
        it('should return a list of assignments', async () => {
            const assignments = [{ _id: 1, title: 'Assignment 1' }];
            Assignment.find.resolves(assignments);

            const response = await app.get('/');

            expect(response.status).toBe(200);
            expect(response.body).toMatch({
                ok: true,
                data: assignments
            });
        });
    });

    describe('POST /', () => {
        it('should create a new assignment', async () => {
            const data = { title: 'Assignment 1' };
            const assignment = { _id: 1, title: 'Assignment 1' };
            Assignment.create.resolves(assignment);

            const response = await app.post('/').send(data);

            expect(response.status).toBe(200);
            expect(response.body).toMatch({
                ok: true,
                message: 'Задание создано',
                data: assignment
            });
        });
    });

    describe('GET /:id', () => {
        it('should get an assignment', async () => {
            const assignment = {
                _id: 1,
                title: 'Assignment 1',
                enrollment: {
                    domain: 'domain'
                },
                exercises: []
            };
            Assignment.findById.returnsQuery(assignment);

            const response = await app.get('/1');

            expect(response.status).toBe(200);
            expect(response.body).toMatch({
                ok: true,
                data: assignment
            });
        });
    });

    describe('PUT /:id', () => {
        it('should update an assignment', async () => {
            const data = { title: 'Assignment 2' };
            const assignment = { _id: 1, title: 'Assignment 2' };
            Assignment.findOneAndUpdate.resolves(assignment);

            const response = await app.put('/1').send(data);

            expect(response.status).toBe(200);
            expect(response.body).toMatch({
                ok: true,
                message: 'Задание обновлено',
                data: assignment
            });
        });
    });

    describe('DELETE /:id', () => {
        it('should deletes an assignment', async () => {
            const assignment = { _id: 1, id: 1, title: 'Assignment 1' };
            Assignment.findOneAndDelete.resolves(assignment);

            const response = await app.delete('/1');

            expect(response.status).toBe(200);
            expect(response.body).toMatch({
                ok: true,
                message: 'Задание удалено',
                data: {
                    id: assignment._id
                }
            });
        });
    });
});