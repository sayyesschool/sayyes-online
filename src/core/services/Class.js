import datetime from 'shared/libs/datetime';

export default ({
    models: { Data, Enrollment, Lesson, Pack, Room, Transaction },
    services: { Mail }
}) => ({
    packs: null,

    async getPacks() {
        if (this.packs) return this.packs;

        this.packs = await Data.get('enrollment.packs');

        return this.packs;
    },

    async getPack(packId) {
        const packs = await this.getPacks();
        const pack = packs.find(pack => pack.id == packId);

        if (!pack) throw {
            code: 404,
            message: 'Пакет не найден'
        };

        return pack;
    },

    async getPackPrice(packId) {
        const pack = await this.getPack(packId);

        return pack.price;
    },

    async getEnrollment($enrollment) {
        const enrollment = await Enrollment.resolve($enrollment);

        if (!enrollment) throw {
            code: 404,
            message: 'Запись не найдена'
        };

        return enrollment;
    },

    async processPayment(payment) {
        const enrollment = await Enrollment.resolve(payment.data.enrollmentId);

        // TODO: Remove when transactions are implemented
        if (!enrollment) return {};

        const pack = await this.getPack(payment.data.packId);
        const scheduledLessons = enrollment.scheduleLessons(pack.numberOfLessons);

        // TODO: Implement transactions
        // const debitTransaction = await Transaction.create([{
        //     type: 'debit',
        //     amount: payment.amount.value,
        //     currency: payment.amount.currency,
        //     description: payment.description,
        //     paymentId: payment.id,
        //     enrollmentId: enrollment.id,
        //     userId: payment.data.userId
        // },
        // {
        //     type: 'credit',
        //     amount: payment.amount.amount,
        //     currency: payment.amount.currency,
        //     enrollment: debitTransaction.enrollment,
        //     userId: debitTransaction.userId
        // }]);

        const [updatedEnrollment, lessons] = await Promise.all([
            Enrollment.update(enrollment.id, {
                lessonPrice: pack.lessonPrice
            }),
            Lesson.create(scheduledLessons)
        ]);

        return {
            enrollmentId: updatedEnrollment.id,
            lessonIds: lessons.map(lesson => lesson.id)
        };
    },

    async scheduleLesson({ id, ...data }) {
        const room = await this.getAvailableRoom(data);

        await this.checkConflictingLesson({
            ...data,
            roomId: room.id
        });

        data.roomId = room.id;

        return id ?
            Lesson.findByIdAndUpdate(id, data, {
                new: true
            }) :
            Lesson.create(data);
    },

    async getAvailableRoom({ date, duration }) {
        const endDate = datetime(date).add(duration, 'minutes').toDate();

        const availableRoom = await Room.findAvailable(date, endDate);

        if (!availableRoom) throw {
            code: 400,
            message: 'Нет свободной аудитории.'
        };

        return availableRoom;
    },

    async checkConflictingLesson(data) {
        const conflictingLesson = await Lesson.findConflicting(data);

        if (conflictingLesson) throw {
            code: 400,
            message: 'Время уже занято.'
        };
    },

    async notifyStudents() {
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

    async notifyTeachers() {
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