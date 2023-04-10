const Admin = require('./admin');
const Client = require('./client');
const Learner = require('./learner');
const Manager = require('./manager');
const Teacher = require('./teacher');
const User = require('./user');

User.Admin = Admin;
User.Client = Client;
User.Manager = Manager;
User.Learner = Learner;
User.Teacher = Teacher;

module.exports = User;