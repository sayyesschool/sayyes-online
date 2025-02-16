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

    async getPackPrice(packId) {
        const packs = await this.getPacks();
        const pack = packs.find(pack => pack.id === packId);

        if (!pack) throw {
            code: 404,
            message: 'Пакет не найден.'
        };

        return pack.price;
    },

    async processPayment(payment) {
        const [enrollment, pack] = await Promise.all([
            Enrollment.findById(payment.data.enrollmentId),
            Pack.findById(payment.data.packId)
        ]);

        const lessons = enrollment.scheduleLessons(pack.numberOfLessons);

        const debitTransaction = await Transaction.create([{
            type: 'debit',
            amount: payment.amount.value,
            currency: payment.amount.currency,
            description: payment.description,
            paymentId: payment.id,
            enrollmentId: enrollment.id,
            userId: payment.data.userId
        },
        {
            type: 'credit',
            amount: debitTransaction.amount,
            currency: debitTransaction.currency,
            enrollment: debitTransaction.enrollment,
            userId: debitTransaction.userId
        }]);

        const [creditTransaction, updatedEnrollment] = await Promise.all([
            Transaction.create(),
            Enrollment.updateOne({
                _id: enrollment.id
            }, {
                lessonPrice: pack.lessonPrice
            }),
            Lesson.insertMany(lessons)
        ]);

        // TODO finish this method
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