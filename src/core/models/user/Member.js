import { Schema } from 'mongoose';

export const Member = new Schema({});

Member.virtual('meetings', {
    ref: 'Meeting',
    localField: '_id',
    foreignField: 'registrations.userId'
});

Member.virtual('tickets', {
    ref: 'Ticket',
    localField: '_id',
    foreignField: 'userId'
});

Member.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'userId'
});

export default Member;