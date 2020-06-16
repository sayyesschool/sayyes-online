const { Schema } = require('mongoose');

const Student = new Schema();

Student.virtual('meetings', {
    ref: 'Meeting',
    localField: '_id',
    foreignField: 'participants'
});

Student.virtual('tickets', {
    ref: 'Ticket',
    localField: '_id',
    foreignField: 'user'
});

Student.virtual('ticket', {
    ref: 'Ticket',
    localField: '_id',
    foreignField: 'user',
    justOne: true,
    options: {
        paidAt: { date: -1 }
    }
});

module.exports = Student;