module.exports = ({ Lesson }) => ({
    findOne: (req, res, next, id) => {
        Lesson.getById(id)
            .then(lesson => {
                if (!lesson) {
                    const error = new Error('Урок не найдн');
                    error.status = 404;
                    return next(error);
                }

                req.lesson = lesson;

                next();
            })
            .catch(next);
    },

    getMany: (req, res, next) => {
        Lesson.get({
            $or: [
                { date: { $gte: new Date() } },
                { user: req.user }
            ]
        })
            .then(lessons => {
                res.json({
                    ok: true,
                    data: lessons.map(lesson => map(lesson, req.user))
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Lesson.getById(req.params.lessonId)
            .populate('teacher', 'firstname lastname fullname')
            .populate('student', 'firstname lastname fullname')
            .then(lesson => {
                if (!lesson) {
                    const error = new Error('Урок не найдн');
                    error.status = 404;
                    return next(error);
                }

                const videoToken = Lesson.generateVideoToken({
                    room: req.lesson.id,
                    identity: req.user.id
                });
                const chatToken = Lesson.generateChatToken({
                    device: 'browser',
                    identity: req.user.id
                });
                const data = req.lesson.toJSON();

                data.videoToken = videoToken;
                data.chatToken = chatToken;
                data.student = {
                    id: lesson.student.id,
                    name: lesson.student.fullname
                };
                data.teacher = {
                    id: lesson.teacher.id,
                    name: lesson.teacher.fullname
                };

                res.json({
                    ok: true,
                    data
                });
            })
            .catch(next);
    }
});

function map(lesson, user) {
    return lesson;
}