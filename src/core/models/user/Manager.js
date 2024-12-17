import { Schema } from 'mongoose';

export const Manager = new Schema({});

Manager.virtual('enrollments', {
    ref: 'Enrollment',
    localField: '_id',
    foreignField: 'managerId'
});

export default Manager;