const mongoose = require('mongoose');

const UserSchema = require('./user');
const AdminSchema = require('./admin');
const ClientSchema = require('./client');
const ManagerSchema = require('./manager');
const TeacherSchema = require('./teacher');
const StudentSchema = require('./student');

const User = mongoose.model('User', UserSchema);
const Admin = User.discriminator('Admin', AdminSchema, 'admin');
const Client = User.discriminator('Client', ClientSchema, 'client');
const Manager = User.discriminator('Manager', ManagerSchema, 'manager');
const Teacher = User.discriminator('Teacher', TeacherSchema, 'teacher');
const Student = User.discriminator('Student', StudentSchema, 'student');

module.exports = {
    Admin,
    Client,
    Manager,
    Teacher,
    Student,
    User
};