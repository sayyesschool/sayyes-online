const { model } = require('mongoose');

const Conversation = require('./conversation');
const Course = require('./course');
const Enrollment = require('./enrollment');
const Lesson = require('./lesson');
const Payment = require('./payment');
const Request = require('./request');
const Material = require('./material');
const Meeting = require('./meeting');
const Ticket = require('./ticket');
const UserSchema = require('./user');

const User = model('User', UserSchema);
const Admin = User.discriminator('Admin', UserSchema.Admin, 'admin');
const Client = User.discriminator('Client', UserSchema.Client, 'client');
const Manager = User.discriminator('Manager', UserSchema.Manager, 'manager');
const Teacher = User.discriminator('Teacher', UserSchema.Teacher, 'teacher');
const Student = User.discriminator('Student', UserSchema.Student, 'student');

module.exports = {
    Conversation: model('Conversation', Conversation),
    Course: model('Course', Course),
    Enrollment: model('Enrollment', Enrollment),
    Lesson: model('Lesson', Lesson),
    Material: model('Material', Material),
    Meeting: model('Meeting', Meeting),
    Payment: model('Payment', Payment),
    Request: model('Request', Request),
    Ticket: model('Ticket', Ticket),
    User,
    Admin,
    Client,
    Manager,
    Teacher,
    Student
};