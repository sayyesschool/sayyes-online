const Admin = require('./Admin');
const Editor = require('./Editor');
const Learner = require('./Learner');
const Manager = require('./Manager');
const Teacher = require('./Teacher');
const User = require('./User');

User.Admin = Admin;
User.Editor = Editor;
User.Manager = Manager;
User.Learner = Learner;
User.Teacher = Teacher;

module.exports = User;