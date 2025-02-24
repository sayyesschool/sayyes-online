import { Types } from 'mongoose';

export const learner = {
    _id: new Types.ObjectId().toHexString(),
    firstname: 'Ученик',
    email: 'learner@sayyes.school',
    password: '123456',
    role: 'learner',
    domains: ['club', 'lk', 'lms'],
    active: true
};

export const manager = {
    _id: new Types.ObjectId().toHexString(),
    firstname: 'Менеджер',
    email: 'manager@sayyes.school',
    password: '123456',
    role: 'manager',
    domains: ['cms', 'crm'],
    permissions: ['all'],
    active: true
};

export const teacher = {
    _id: new Types.ObjectId().toHexString(),
    firstname: 'Учитель',
    email: 'teacher@sayyes.school',
    password: '123456',
    role: 'teacher',
    domains: ['club', 'lk', 'lms'],
    active: true
};

export default [learner, manager, teacher];