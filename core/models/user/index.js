const User = require('./user');
const Admin = require('./admin');
const Client = require('./client');
const Manager = require('./manager');
const Teacher = require('./teacher');
const Student = require('./student');

User.Admin = Admin;
User.Client = Client;
User.Manager = Manager;
User.Teacher = Teacher;
User.Student = Student;

module.exports = User;