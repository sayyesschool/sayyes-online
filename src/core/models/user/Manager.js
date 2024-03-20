const { Schema } = require('mongoose');

const Manager = new Schema({});

Manager.virtual('enrollments', {
    ref: 'Enrollment',
    localField: '_id',
    foreignField: 'managerId'
});

module.exports = Manager;