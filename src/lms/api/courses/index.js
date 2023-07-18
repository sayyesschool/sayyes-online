const { Router } = require('express');

const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const controller = Controller(context);

    router.get('/', controller.getCourses);
    router.get('/:course', controller.getCourse);
    router.get('/:course/exercises/:exercise', controller.getExercise);

    return router;
};