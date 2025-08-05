import { Types } from 'mongoose';

export const learner = {
    _id: new Types.ObjectId().toHexString(),
    firstname: 'Ученик',
    lastname: 'Учеников',
    email: 'learner@sayyes.school',
    password: '123456',
    role: 'learner',
    domains: ['club', 'lk', 'lms'],
    active: true
};

export const learner2 = {
    _id: new Types.ObjectId().toHexString(),
    firstname: 'Студент',
    lastname: 'Студентов',
    email: 'learner2@sayyes.school',
    password: '123456',
    role: 'learner',
    domains: ['club', 'lk', 'lms'],
    active: true
};

export const manager = {
    _id: new Types.ObjectId().toHexString(),
    firstname: 'Менеджер',
    lastname: 'Менеджерович',
    email: 'manager@sayyes.school',
    password: '123456',
    role: 'manager',
    domains: ['cms', 'crm'],
    permissions: ['all'],
    active: true
};

export const manager2 = {
    _id: new Types.ObjectId().toHexString(),
    firstname: 'Таск',
    lastname: 'Таскович',
    email: 'manager2@sayyes.school',
    password: '123456',
    role: 'manager',
    domains: ['cms', 'crm'],
    permissions: ['all'],
    active: true
};

export const manager3 = {
    _id: new Types.ObjectId().toHexString(),
    firstname: 'Дедлайн',
    lastname: 'Дедлайнович',
    email: 'manager3@sayyes.school',
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

export const teacher2 = {
    _id: new Types.ObjectId().toHexString(),
    firstname: 'Тичер',
    email: 'teacher2@sayyes.school',
    password: '123456',
    role: 'teacher',
    domains: ['club', 'lk', 'lms'],
    active: true
};

export default [learner, learner2, manager, manager2, manager3, teacher, teacher2];