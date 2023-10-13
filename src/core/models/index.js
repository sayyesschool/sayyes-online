const { model } = require('mongoose');

const Assignment = require('./assignment');
const Comment = require('./comment');
const Course = require('./course');
const Enrollment = require('./enrollment');
const Exercise = require('./exercise');
const Lesson = require('./lesson');
const Material = require('./material');
const Meeting = require('./meeting');
const Pack = require('./pack');
const Payment = require('./payment');
const Post = require('./post');
const Progress = require('./progress');
const Request = require('./request');
const Room = require('./room');
const Task = require('./task');
const Transaction = require('./transaction');
const UserSchema = require('./user');

const User = model('User', UserSchema);
const Admin = User.discriminator('Admin', UserSchema.Admin, 'admin');
const Client = User.discriminator('Client', UserSchema.Client, 'client');
const Learner = User.discriminator('Learner', UserSchema.Learner, 'learner');
const Manager = User.discriminator('Manager', UserSchema.Manager, 'manager');
const Teacher = User.discriminator('Teacher', UserSchema.Teacher, 'teacher');

module.exports = () => ({
    Assignment: model('Assignment', Assignment),
    Comment: model('Comment', Comment),
    Course: model('Course', Course),
    Enrollment: model('Enrollment', Enrollment),
    Exercise: model('Exercise', Exercise),
    Lesson: model('Lesson', Lesson),
    Material: model('Material', Material),
    Meeting: model('Meeting', Meeting),
    Pack: model('Pack', Pack),
    Payment: model('Payment', Payment),
    Post: model('Post', Post),
    Progress: model('Progress', Progress, 'progress'),
    Request: model('Request', Request),
    Room: model('Room', Room),
    Task: model('Task', Task),
    Transaction: model('Transaction', Transaction),
    User,
    Admin,
    Client,
    Learner,
    Manager,
    Teacher
});