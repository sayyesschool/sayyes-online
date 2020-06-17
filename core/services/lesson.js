const { Types: { ObjectId } } = require('mongoose');
const moment = require('moment');

const { generateVideoToken, generateChatToken } = require('../lib/twilio');
const { Lesson } = require('../models');
const Mail = require('./mail');

module.exports = {
    get(...args) {
        return Lesson.find(...args)
            .populate('host', 'firstname lastname avatarUrl');
    },

    getScheduled() {
        return Lesson.find({
            date: { $gte: new Date() },
            status: 'scheduled',
            published: true
        })
            .sort({ date: 1 })
            .populate('host', 'firstname lastname avatarUrl');
    },

    getOne(...args) {
        return Lesson.findOne(...args)
            .populate('teacher', 'firstname lastname avatarUrl');
    },

    getById(...args) {
        return Lesson.findById(...args)
            .populate('host', 'firstname lastname avatarUrl')
            .populate('participants');
    },

    async create(data, ...args) {
        const lesson = await Lesson.create(data, ...args);

        return lesson;
    },

    async update(id, data, ...args) {
        const lesson = await Lesson.findByIdAndUpdate(id, data, { new: true }, ...args);

        return lesson;
    },

    async cancel(id) {
        const lesson = await Lesson.findByIdAndUpdate(id, { status: 'canceled' }, { new: true });

        // send email

        return lesson;
    },

    async delete(id, ...args) {
        const lesson = await Lesson.findByIdAndDelete(id, ...args);

        return lesson;
    },

    generateVideoToken,
    generateChatToken,

    notifyStudent() {
        const inAnHour = moment().utc().minutes(0).seconds(0).milliseconds(0).add(1, 'hour');

        Lesson.find({
            date: inAnHour.toDate()
        })
            .populate('student', 'firstname lastname email')
            .populate('teacher', 'firstname lastname avatarUrl')
            .then(lessons => {
                const messages = lessons.map(lesson => ({
                    to: [{
                        name: `${lesson.student.firstname} ${lesson.student.lastname}`,
                        email: lesson.student.email
                    }],
                    subject: 'Напоминание об уроке',
                    templateId: 1348680,
                    variables: {
                        firstname: lesson.student.firstname,
                        title: lesson.title,
                        datetime: lesson.datetime,
                        teacher: `${lesson.teacher.firstname} ${lesson.teacher.lastname}`,
                        url: lesson.url
                    }
                }));

                if (messages.length > 0) {
                    Mail.sendMany(messages);
                }
            });
    }
};