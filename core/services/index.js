const config = require('../config');
const lib = require('../lib');
const models = require('../models');

const Mail = require('./mail')(lib.mailjet);
const Auth = require('./auth')(config, models.User, Mail);
const Course = require('./course')(models.Course);
const Enrollment = require('./enrollment')(models.Enrollment);
const File = require('./file');
const Lesson = require('./lesson')(models.Lesson, Mail);
const Material = require('./material')(models.Material);
const Newsletter = require('./newsletter')(lib.mailjet);
const Payment = require('./payment')(config, lib.yandexKassa, models.Payment);
const Request = require('./request')(models.Request);
const Ticket = require('./ticket')(models.Ticket, Payment);
const Meeting = require('./meeting')(lib.zoom, models.Meeting, { Mail, Ticket, Newsletter });
const User = require('./user');

module.exports = {
    Auth,
    Course,
    Enrollment,
    File,
    Lesson,
    Mail,
    Material,
    Meeting,
    Payment,
    Request,
    Client: User(models.Client),
    Manager: User(models.Manager),
    Student: User(models.Student),
    Teacher: User(models.Teacher),
    User: User(models.User)
};