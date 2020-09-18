module.exports = Quiz => ({
    quizzes: {
        get: (req, res, next) => {
            Quiz.find({
                published: true
            })
                .then(quizzes => {
                    res.json({
                        ok: true,
                        quizzes
                    });
                })
                .catch(next);
        }
    },

    quiz: {
        find: (req, res, next, slug) => {
            Quiz.findOne({ slug })
                .then(quiz => {
                    if (!quiz) return res.sendStatus(404);

                    req.quiz = quiz;

                    next();
                })
                .catch(next);
        },

        get: (req, res, next) => {
            res.json({
                ok: true,
                quiz: req.quiz
            });
        },

        post: (req, res, next) => {
            const results = Quiz.check(req.quiz, req.body.answers);

            res.json({
                ok: true,
                results
            });
        }
    }
});