import { Router } from 'express';

import Controller from './controller';

export default context => {
    const router = Router();
    const controller = Controller(context);

    router.route('/')
        .get(controller.getCourses)
        .post(controller.createCourse);

    router.route('/:course')
        .get(controller.getCourse)
        .put(controller.updateCourse)
        .delete(controller.deleteCourse);

    router.route('/:course/units{/:unit}')
        .post(controller.createUnit)
        .put(controller.updateUnit)
        .delete(controller.deleteUnit);

    router.route('/:course/lessons{/:lesson}')
        .post(controller.createLesson)
        .put(controller.updateLesson)
        .delete(controller.deleteLesson);

    router.route('/:course/sections{/:section}')
        .post(controller.createSection)
        .put(controller.updateSection)
        .delete(controller.deleteSection);

    router.route('/:course/exercises{/:exercise}')
        .get(controller.getExercise)
        .post(controller.createExercise)
        .put(controller.updateExercise)
        .delete(controller.deleteExercise);

    router.route('/:course/:exercises/:exercise/items{/:item}')
        .post(controller.createItem)
        .put(controller.updateItem)
        .delete(controller.deleteItem);

    return router;
};