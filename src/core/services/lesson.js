import moment from 'moment';

export default (Lesson, Mail) => ({
    notifyStudents() {
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
    },

    notifyParticipants() {
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
                    subject: 'Напоминание о встрече',
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
    },

    notifyTeachers() {
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
});