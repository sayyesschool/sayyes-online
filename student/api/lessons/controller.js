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
        const token = Lesson.generateToken(req.lesson);
        const lesson = req.lesson.toJSON();

        lesson.token = token;
        console.log(token);
        res.json({
            ok: true,
            data: lesson
        });
    }
});

function map(lesson, user) {
    return lesson;
}