const expect = require('expect');
const { stub } = require('sinon');

const Controller = require('./controller');

const Assignment = {
    find: stub(),
    findById: stub(),
    create: stub(),
    findOneAndUpdate: stub(),
    findOneAndDelete: stub()
};

const context = {
    models: {
        Assignment
    }
};

describe('Assignment controller', () => {
    describe('getMany', () => {
        it('should return list of assignments', async () => {
            const assignments = [{ _id: 1, title: 'Assignment 1' }];
            Assignment.find.resolves(assignments);

            const req = {};
            const res = {
                json: stub()
            };
            const controller = Controller(context);

            await controller.getMany(req, res);

            expect(res.json.calledWith({
                ok: true,
                data: assignments
            })).toBe(true);
        });
    });

    describe('getOne', () => {
        it('should return assignment by id', async () => {
            const assignment = {
                _id: 1,
                title: 'Assignment 1',
                enrollment: {
                    domain: 'domain'
                },
                exercises: []
            };
            Assignment.findById.returnsQuery(assignment);

            const req = { params: { id: 1 } };
            const res = {
                json: stub()
            };
            const next = stub();
            const controller = Controller(context);

            await controller.getOne(req, res, next);

            expect(res.json.calledWith({
                ok: true,
                data: assignment
            })).toBe(true);
        });

        it('should return 404 if assignment not found', async () => {
            Assignment.findById.returnsQuery(null);

            const req = { params: { id: 1 } };
            const res = {
                json: stub()
            };
            const next = stub();
            const controller = Controller(context);

            await controller.getOne(req, res, next);

            expect(next.called).toBe(true);
            expect(next.args[0][0].status).toBe(404);
        });
    });

    describe('create', () => {
        it('should create assignment', async () => {
            const data = { title: 'Assignment 1' };
            const assignment = { _id: 1, title: 'Assignment 1' };
            Assignment.create.resolves(assignment);

            const req = { body: data };
            const res = {
                json: stub()
            };
            const controller = Controller(context);

            await controller.create(req, res);

            expect(res.json.calledWith({
                ok: true,
                message: 'Задание создано',
                data: assignment
            })).toBe(true);
        });
    });

    describe('update', () => {
        it('should update assignment', async () => {
            const data = { title: 'Assignment 2' };
            const assignment = { _id: 1, title: 'Assignment 2' };
            Assignment.findOneAndUpdate.resolves(assignment);

            const req = { params: { id: 1 }, body: data };
            const res = {
                json: stub()
            };
            const controller = Controller(context);

            await controller.update(req, res);

            expect(res.json.calledWith({
                ok: true,
                message: 'Задание обновлено',
                data: assignment
            })).toBe(true);
        });
    });

    describe('delete', () => {
        it('should delete assignment', async () => {
            const assignment = {
                _id: 1,
                id: 1,
                title: 'Assignment 1',
                enrollmentId: 1
            };
            Assignment.findOneAndDelete.resolves(assignment);

            const req = { params: { id: 1 } };
            const res = {
                json: stub()
            };
            const controller = Controller(context);

            await controller.delete(req, res);

            expect(res.json.calledWith({
                ok: true,
                message: 'Задание удалено',
                data: {
                    id: assignment._id,
                    enrollmentId: assignment.enrollmentId
                }
            })).toBe(true);
        });
    });
});