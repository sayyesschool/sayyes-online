module.exports = ({ Course }) => ({
    courses: {
        get: (req, res, next) => {
            Course.get(req.query)
                .then(courses => {
                    res.json({
                        ok: true,
                        data: courses
                    });
                })
                .catch(next);
        },

        getOne: (req, res, next) => {
            Course.getById(req.params.course)
                .then(course => {
                    res.json({
                        ok: true,
                        data: course
                    });
                })
                .catch(next);
        },

        create: (req, res, next) => {
            Course.create(req.body)
                .then(course => {
                    res.json({
                        ok: true,
                        message: 'Курс создан',
                        data: course
                    });
                })
                .catch(next);
        },

        update: (req, res, next) => {
            Course.update(req.params.course, req.body)
                .select('-units -lessons -exercises')
                .then(course => {
                    res.json({
                        ok: true,
                        message: 'Курс изменен',
                        data: course
                    });
                })
                .catch(next);
        },

        delete: (req, res, next) => {
            Course.delete(req.params.course)
                .select('id')
                .then(course => {
                    res.json({
                        ok: true,
                        message: 'Курс удален',
                        data: course
                    });
                })
                .catch(next);
        }
    },

    units: {
        create: (req, res, next) => {
            Course.update(req.params.course, {
                $push: { units: req.body }
            }, {
                new: true,
                projection: {
                    id: true,
                    slug: true,
                    units: { $slice: -1 }
                }
            }).then(({ units: [unit] }) => {
                res.json({
                    ok: true,
                    message: 'Юнит создан',
                    data: unit
                });
            }).catch(next);
        },

        update: (req, res, next) => {
            const data = Array.from(Object.entries(req.body))
                .reduce((data, [key, value]) => {
                    data[`units.$[u].${key}`] = value;
                    return data;
                }, {});

            Course.update(req.params.course, {
                $set: data
            }, {
                new: true,
                arrayFilters: [{ 'u._id': req.params.unit }],
                projection: {
                    id: true,
                    slug: true,
                    units: { $elemMatch: { _id: req.params.unit } }
                }
            }).then(({ units: [unit] }) => {
                res.json({
                    ok: true,
                    message: 'Юнит изменен',
                    data: unit
                });
            }).catch(next);
        },

        delete: (req, res, next) => {
            Course.update(req.params.course, {
                $pull: { units: { _id: req.params.unit } }
            }, {
                new: false,
                projection: {
                    id: true,
                    slug: true,
                    units: { $elemMatch: { _id: req.params.unit } }
                }
            }).then(({ units: [unit] }) => {
                res.json({
                    ok: true,
                    message: 'Юнит удален',
                    data: unit
                });
            }).catch(next);
        }
    },

    lessons: {
        create: (req, res, next) => {
            const lesson = new Course.model().lessons.create(req.body);

            Course.update(req.params.course, {
                $push: {
                    lessons: lesson,
                    'units.$[u]._lessons': lesson.id
                }
            }, {
                arrayFilters: [{ 'u._id': req.body.unitId }],
                projection: {
                    id: true,
                    slug: true,
                    lessons: { $slice: -1 }
                }
            }).then(({ lessons: [lesson] }) => {
                const data = lesson.toObject();

                data.unitId = req.body.unitId;

                res.json({
                    ok: true,
                    message: 'Урок создан',
                    data
                });
            }).catch(next);
        },

        update: (req, res, next) => {
            const data = Array.from(Object.entries(req.body))
                .reduce((data, [key, value]) => {
                    data[`lessons.$[l].${key}`] = value;
                    return data;
                }, {});

            Course.update(req.params.course, {
                $set: data
            }, {
                new: true,
                arrayFilters: [{ 'l._id': req.params.lesson }],
                projection: {
                    id: true,
                    slug: true,
                    lessons: { $elemMatch: { _id: req.params.lesson } }
                }
            }).then(course => {
                res.json({
                    ok: true,
                    message: 'Урок изменен',
                    data: course.lessons[0]
                });
            }).catch(next);
        },

        delete: (req, res, next) => {
            Course.update(req.params.course, {
                $pull: {
                    lessons: { _id: req.params.lesson },
                    'units.$[u]._lessons': req.params.lesson
                }
            }, {
                arrayFilters: [{ 'u._lessons': req.params.lesson }],
                lean: true,
                projection: {
                    lessons: { $elemMatch: { _id: req.params.lesson } },
                    units: { $elemMatch: { _lessons: req.params.lesson } }
                }
            }).then(({ lessons: [lesson], units: [unit] }) => {
                res.json({
                    ok: true,
                    message: 'Урок удален',
                    data: {
                        id: lesson._id,
                        unitId: unit._id
                    }
                });
            }).catch(next);
        }
    },

    exercises: {
        create: (req, res, next) => {
            const exercise = new Course.model().exercises.create(req.body);

            Course.update(req.params.course, {
                $push: {
                    exercises: exercise,
                    'lessons.$[l]._exercises': exercise.id
                }
            }, {
                new: true,
                arrayFilters: [{ 'l._id': req.body.lessonId }],
                projection: {
                    id: true,
                    slug: true,
                    exercises: { $slice: -1 }
                }
            }).then(({ exercises: [exercise] }) => {
                const data = exercise.toObject();

                data.lessonId = req.body.lessonId;

                res.json({
                    ok: true,
                    message: 'Упражнение создано',
                    data
                });
            }).catch(next);
        },

        update: (req, res, next) => {
            const data = Array.from(Object.entries(req.body))
                .reduce((data, [key, value]) => {
                    data[`exercises.$[l].${key}`] = value;
                    return data;
                }, {});

            Course.update(req.params.course, {
                $set: data
            }, {
                new: true,
                arrayFilters: [{ 'l._id': req.params.lesson }],
                projection: {
                    id: true,
                    slug: true,
                    exercises: { $elemMatch: { _id: req.params.exercise } }
                }
            }).then(course => {
                res.json({
                    ok: true,
                    message: 'Упражнение изменено',
                    data: course.exercises[0]
                });
            }).catch(next);
        },

        delete: (req, res, next) => {
            Course.update(req.params.course, {
                $pull: {
                    exercises: { _id: req.params.exercise },
                    'lessons.$[l]._exercises': req.params.exercise
                }
            }, {
                arrayFilters: [{ 'l._exercises': req.params.exercise }],
                lean: true,
                projection: {
                    exercises: { $elemMatch: { _id: req.params.exercise } },
                    lessons: { $elemMatch: { _exercises: req.params.exercise } }
                }
            }).then(({ exercises: [exercise], lessons: [lesson] }) => {
                console.log(exercise);
                res.json({
                    ok: true,
                    message: 'Упражнение удалено',
                    data: {
                        id: exercise._id,
                        lessonId: lesson._id
                    }
                });
            }).catch(next);
        }
    }
});