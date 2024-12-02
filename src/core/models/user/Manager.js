import { Schema } from 'mongoose';

const permissions = [
    'all',
    'enrollments',
    'meetings',
    'requests',
    'payments',
    'tickets',
    'lessons',
    'learners',
    'managers',
    'teachers',
    'tickets',
    'users',
    'settings'
];

export const Manager = new Schema({
    permissions: {
        type: [String],
        enum: permissions,
        default: ['all']
    }
});

Manager.virtual('enrollments', {
    ref: 'Enrollment',
    localField: '_id',
    foreignField: 'managerId'
});

export default Manager;