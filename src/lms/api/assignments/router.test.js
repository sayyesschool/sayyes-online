const expect = require('expect');
const express = require('express');
const { stub } = require('sinon');
const test = require('supertest');

const router = require('./router');

const context = global.$context;
const Assignment = stub(context.models.Assignment);

context.models.Assignment = Assignment;

const app = test(
    express()
        .use(express.json())
        .use(router(context))
);

const mockData = {
    assignment: {
        _id: 1,
        id: 1,
        title: 'Assignment 1',
        enrollment: {
            domain: 'domain'
        },
        exercises: []
    },
    assignments: [
        { _id: 1, title: 'Assignment 1' }
    ]
};

describe('Assignment router', () => {
    describe('GET /', () => {
        it('should return a list of assignments', async () => {
            Assignment.find.resolves(mockData.assignments);

            const response = await app.get('/');

            expect(response.status).toBe(200);
            expect(response.body).toMatch({
                ok: true,
                data: mockData.assignments
            });
        });
    });

    describe('POST /', () => {
        it('should create a new assignment', async () => {
            Assignment.create.resolves(mockData.assignment);

            const response = await app.post('/').send({ title: 'Assignment 1' });

            expect(response.status).toBe(200);
            expect(response.body).toMatch({
                ok: true,
                message: 'Задание создано',
                data: mockData.assignment
            });
        });
    });

    describe('GET /:id', () => {
        it('should get an assignment', async () => {
            Assignment.findById.returnsQuery(mockData.assignment);

            const response = await app.get('/1');

            expect(response.status).toBe(200);
            expect(response.body).toMatch({
                ok: true,
                data: mockData.assignment
            });
        });
    });

    describe('PUT /:id', () => {
        it('should update an assignment', async () => {
            Assignment.findOneAndUpdate.resolves(mockData.assignment);

            const response = await app.put('/1').send({ title: 'Assignment 2' });

            expect(response.status).toBe(200);
            expect(response.body).toMatch({
                ok: true,
                message: 'Задание обновлено',
                data: {
                    ...mockData.assignment,
                    title: 'Assignment 2'
                }
            });
        });
    });

    describe('DELETE /:id', () => {
        it('should delete an assignment', async () => {
            Assignment.findOneAndDelete.resolves(mockData.assignment);

            const response = await app.delete('/1');

            expect(response.status).toBe(200);
            expect(response.body).toMatch({
                ok: true,
                message: 'Задание удалено',
                data: {
                    id: mockData.assignment._id
                }
            });
        });
    });
});