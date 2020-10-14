const config = require('../config');
const models = require('../models');

const Mail = require('./mail')(config);
const Auth = require('./auth')(config, models.User, Mail);
const Client = require('./client')(models.Client);
const Course = require('./course')(models.Course);
const Enrollment = require('./enrollment')(models.Enrollment);
const Lesson = require('./lesson');
const Manager = require('./manager')(models.Manager);
const Payment = require('./payment');
const Quiz = require('./quiz')(models.Quiz);
const Request = require('./request')(models.Request);
const Student = require('./student')(models.Student);
const Teacher = require('./teacher')(models.Teacher);
const User = require('./user')(models.User);

module.exports = {
    Auth,
    Mail,
    Client,
    Course,
    Enrollment,
    Lesson,
    Manager,
    Payment,
    Request,
    Quiz,
    Student,
    Teacher,
    User
};