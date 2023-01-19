module.exports = ({
    models: { Course }
}) => ({
    courses: {
        get: (req, res, next) => {
            Course.find(req.query)
                .select('slug title image')
                .then(courses => {
                    res.json({
                        ok: true,
                        data: courses
                    });
                })
                .catch(next);
        },

        getOne: (req, res, next) => {
            Course.findById(req.params.course, 'slug title image units lessons exercises._id exercises.title')
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
            Course.findByIdAndUpdate(req.params.course, req.body)
                .select('-audios -videos -units -lessons -exercises')
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
            Course.findByIdAndDelete(req.params.course)
                .select('id')
                .then(course => {
                    res.json({
                        ok: true,
                        message: 'Курс удален',
                        data: {
                            id: course.id
                        }
                    });
                })
                .catch(next);
        }
    },

    units: {
        create: (req, res, next) => {
            Course.findByIdAndUpdate({
                _id: req.params.course
            }, {
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

            Course.findByIdAndUpdate({
                _id: req.params.course
            }, {
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
            Course.findByIdAndUpdate(req.params.course, {
                $pull: {
                    units: { _id: req.params.unit },
                    lessons: { _unit: req.params.unit },
                    exercises: { _unit: req.params.unit }
                }
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
                    data: {
                        id: unit.id
                    }
                });
            }).catch(next);
        }
    },

    lessons: {
        create: (req, res, next) => {
            const lesson = new Course().lessons.create(req.body);

            Course.findByIdAndUpdate(req.params.course, {
                $push: {
                    lessons: lesson,
                    'units.$[u]._lessons': lesson.id
                }
            }, {
                new: true,
                arrayFilters: [{ 'u._id': lesson.unitId }],
                projection: {
                    id: true,
                    slug: true,
                    lessons: { $slice: -1 }
                }
            }).then(course => {
                res.json({
                    ok: true,
                    message: 'Урок создан',
                    data: course.lessons[0]
                });
            }).catch(next);
        },

        update: (req, res, next) => {
            const data = Array.from(Object.entries(req.body))
                .reduce((data, [key, value]) => {
                    data[`lessons.$[l].${key}`] = value;
                    return data;
                }, {});

            Course.findByIdAndUpdate(req.params.course, {
                $set: data
            }, {
                new: true,
                arrayFilters: [{ 'l._id': req.params.lesson }],
                projection: {
                    id: true,
                    slug: true,
                    lessons: { $elemMatch: { _id: req.params.lesson } }
                }
            }).then(({ lessons: [lesson] }) => {
                res.json({
                    ok: true,
                    message: 'Урок изменен',
                    data: lesson
                });
            }).catch(next);
        },

        delete: (req, res, next) => {
            Course.findByIdAndUpdate(req.params.course, {
                $pull: {
                    lessons: { _id: req.params.lesson },
                    'units.$[u]._lessons': req.params.lesson,
                    exercises: { _lesson: req.params.lesson }
                }
            }, {
                arrayFilters: [{ 'u._lessons': req.params.lesson }],
                projection: {
                    lessons: { $elemMatch: { _id: req.params.lesson } },
                    units: { $elemMatch: { _lessons: req.params.lesson } }
                }
            }).then(({ lessons: [lesson], units: [unit] }) => {
                const data = lesson.toObject();

                data.unitId = unit.id;

                res.json({
                    ok: true,
                    message: 'Урок удален',
                    data
                });
            }).catch(next);
        }
    },

    exercises: {
        getOne: (req, res, next) => {
            Course.findOne({
                _id: req.params.course,
                'exercises._id': req.params.exercise
            }, {
                'exercises.$': true
            }).then(({ exercises: [exercise] }) => {
                const data = exercise.toJSON();

                res.json({
                    ok: true,
                    data
                });
            }).catch(next);
        },

        create: (req, res, next) => {
            const exercise = new Course().exercises.create(req.body);

            Course.findByIdAndUpdate(req.params.course, {
                $push: {
                    exercises: exercise,
                    'lessons.$[l]._exercises': exercise.id
                }
            }, {
                new: true,
                arrayFilters: [{ 'l._id': exercise.lessonId }],
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
                    data[`exercises.$[e].${key}`] = value;
                    return data;
                }, {});

            Course.findByIdAndUpdate(req.params.course, {
                $set: data
            }, {
                new: true,
                arrayFilters: [{ 'e._id': req.params.exercise }],
                projection: {
                    id: true,
                    slug: true,
                    exercises: { $elemMatch: { _id: req.params.exercise } }
                }
            }).then(({ exercises: [exercise] }) => {
                res.json({
                    ok: true,
                    message: 'Упражнение изменено',
                    data: exercise
                });
            }).catch(next);
        },

        delete: (req, res, next) => {
            Course.findByIdAndUpdate(req.params.course, {
                $pull: {
                    exercises: { _id: req.params.exercise },
                    'lessons.$[l]._exercises': req.params.exercise
                }
            }, {
                arrayFilters: [{ 'l._exercises': req.params.exercise }],
                projection: {
                    exercises: { $elemMatch: { _id: req.params.exercise } }
                }
            }).then(({ exercises: [exercise] }) => {
                res.json({
                    ok: true,
                    message: 'Упражнение удалено',
                    data: exercise
                });
            }).catch(next);
        }
    },

    items: {
        create: (req, res, next) => {
            const { item, position } = req.body;

            Course.findByIdAndUpdate(req.params.course, {
                $push: {
                    'exercises.$[e].items': position !== undefined ? {
                        $each: [item],
                        $position: position
                    } : item
                }
            }, {
                new: true,
                arrayFilters: [{ 'e._id': req.params.exercise }],
                projection: {
                    id: true,
                    slug: true,
                    exercises: { $elemMatch: { _id: req.params.exercise } }
                }
            }).then(({ exercises: [exercise] }) => {
                const item = exercise.items.at(position !== undefined ? position : -1).toObject();

                res.json({
                    ok: true,
                    message: 'Элемент создан',
                    data: {
                        item,
                        position
                    }
                });
            }).catch(next);
        },

        update: (req, res, next) => {
            delete req.body.id;
            delete req.body.type;
            delete req.body.courseId;
            delete req.body.exerciseId;

            const data = Array.from(Object.entries(req.body))
                .reduce((data, [key, value]) => {
                    data[`exercises.$[e].items.$[i].${key}`] = value;
                    return data;
                }, {});

            Course.findByIdAndUpdate(req.params.course, {
                $set: data
            }, {
                new: true,
                arrayFilters: [
                    { 'e._id': req.params.exercise },
                    { 'i._id': req.params.item }
                ],
                projection: {
                    id: true,
                    slug: true,
                    exercises: { $elemMatch: { _id: req.params.exercise } }
                }
            }).then(({ exercises: [exercise] }) => {
                const item = exercise.items.find(item => item.id == req.params.item);

                res.json({
                    ok: true,
                    message: 'Элемент изменен',
                    data: item
                });
            }).catch(next);
        },

        delete: (req, res, next) => {
            Course.findByIdAndUpdate(req.params.course, {
                $pull: {
                    'exercises.$[e].items': {
                        _id: req.params.item
                    }
                }
            }, {
                arrayFilters: [
                    { 'e._id': req.params.exercise }
                ],
                projection: {
                    exercises: { $elemMatch: { _id: req.params.exercise } }
                }
            }).then(({ exercises: [exercise] }) => {
                const item = exercise.items.find(item => item.id == req.params.item);

                res.json({
                    ok: true,
                    message: 'Элемент удален',
                    data: item
                });
            }).catch(next);
        }
    }
});