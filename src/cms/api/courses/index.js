const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const { courses, units, lessons, exercises, items, courses_v2, exercises_v2, items_v2 } = Controller(context);

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
        .get(exercises.getOne)
        .post(exercises.create)
        .put(exercises.update)
        .delete(exercises.delete);

    router.route('/:course/exercises/:exercise/items/:item?')
        .post(items.create)
        .put(items.update)
        .delete(items.delete);

    return router;
};