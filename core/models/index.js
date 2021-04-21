const { model } = require('mongoose');

const Comment = require('./comment');
const Course = require('./course');
const Enrollment = require('./enrollment');
const Lesson = require('./lesson');
const Pack = require('./pack');
const Payment = require('./payment');
const Post = require('./post');
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
    Comment: model('Comment', Comment),
    Course: model('Course', Course),
    Enrollment: model('Enrollment', Enrollment),
    Lesson: model('Lesson', Lesson),
    Material: model('Material', Material),
    Meeting: model('Meeting', Meeting),
    Pack: model('Pack', Pack),
    Payment: model('Payment', Payment),
    Post: model('Post', Post),
    Request: model('Request', Request),
    Ticket: model('Ticket', Ticket),
    User,
    Admin,
    Client,
    Manager,
    Teacher,
    Student
};