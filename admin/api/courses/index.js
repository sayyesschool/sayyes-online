const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const { courses, audios, videos, units, lessons, exercises } = Controller(context);

    router.route('/')
        .get(courses.get)
        .post(courses.create);

    router.route('/:course')
        .get(courses.getOne)
        .put(courses.update)
        .delete(courses.delete);

    router.route('/:course/audios/:audio?')
        .post(audios.create)
        .put(audios.update)
        .delete(audios.delete);

    router.route('/:course/videos/:video?')
        .post(videos.create)
        .put(videos.update)
        .delete(videos.delete);

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