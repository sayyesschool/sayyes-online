import datetime from 'shared/libs/datetime';

export default (Lesson, Mail) => ({
    notifyStudents() {
        const inAnHour = datetime().utc().minutes(0).seconds(0).milliseconds(0).add(1, 'hour');

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
                    Mail.send(messages);
                }
            });
    },

    notifyParticipants() {
        const inAnHour = datetime().utc().minutes(0).seconds(0).milliseconds(0).add(1, 'hour');

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
                    Mail.send(messages);
                }
            });
    },

    notifyTeachers() {
        const inAnHour = datetime().utc().minutes(0).seconds(0).milliseconds(0).add(1, 'hour');

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
                    Mail.send(messages);
                }
            });
    }
});