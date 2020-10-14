const { Router } = require('express');

const Controller = require('./controller');

module.exports = core => {
    const router = Router();
    const { courses, units, lessons, exercises } = Controller(core.services);

    router.route('/')
        .get(courses.get)
        .post(courses.create);

    router.route('/:course')
        .get(courses.getOne)
        .put(courses.update)
        .delete(courses.delete);

    router.route('/:course/units/:unit?')
        .post(units.create)
        .put(units.update)
        .delete(units.delete);

    router.route('/:course/lessons/:lesson?')
        .post(lessons.create)
        .put(lessons.update)
        .delete(lessons.delete);

    router.route('/:course/exercises/:exercise?')
        .post(exercises.create)
        .put(exercises.update)
        .delete(exercises.delete);

    return router;
};