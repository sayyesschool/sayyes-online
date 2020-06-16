const mongoose = require('mongoose');

const UserSchema = require('./user');
const ManagerSchema = require('./manager');
const TeacherSchema = require('./teacher');
const StudentSchema = require('./student');

const User = mongoose.model('User', UserSchema);
const Manager = User.discriminator('Manager', ManagerSchema, 'manager');
const Teacher = User.discriminator('Teacher', TeacherSchema, 'teacher');
const Student = User.discriminator('Student', StudentSchema, 'student');

module.exports = { User, Manager, Teacher, Student };