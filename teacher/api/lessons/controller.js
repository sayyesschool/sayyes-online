module.exports = ({
    models: { Lesson, Room }
}) => ({
    get: (req, res, next) => {
        Lesson.find({ teacher: req.user.id, ...req.query })
            .sort({ date: 1 })
            .populate('client', 'firstname lastname email')
            .populate('room', 'title login password')
            .then(lessons => {
                res.json({
                    ok: true,
                    data: lessons
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Lesson.findById(req.params.lessonId)
            .populate('client')
            .then(lesson => {
                res.json({
                    ok: true,
                    data: lesson
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        req.body.teacher = req.user.id;

        Lesson.findConflicting(req.body.date, req.body.duration)
            .then(lesson => {
                if (lesson) throw new Error('Не удалось запланировать урок. Время уже занято.');

                return Room.findAvailable(req.body.date, req.body.duration);
            })
            .then(room => {
                if (!room) throw new Error('Не удалось запланировать урок. Нет свободной аудитории.');

                req.body.room = room.id;

                return Lesson.create(req.body)
                    .then(lesson => {
                        lesson.room = room;

                        res.json({
                            ok: true,
                            message: 'Урок создан',
                            data: lesson
                        });
                    });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Lesson.findByIdAndUpdate(req.params.lessonId, req.body, {
            new: true,
            select: Object.keys(req.body).join(' ')
        })
            .then(lesson => {
                res.json({
                    ok: true,
                    message: 'Урок изменен',
                    data: lesson
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Lesson.findByIdAndDelete(req.params.lessonId)
            .then(lesson => {
                res.json({
                    ok: true,
                    message: 'Урок удален',
                    data: {
                        id: lesson.id,
                        enrollment: lesson.enrollment
                    }
                });
            })
            .catch(next);
    }
});