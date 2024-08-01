export default ({
    models: { Course, Exercise }
}) => ({
    // Courses
    getCourses: async (req, res) => {
        const courses = await Course.find(req.query)
            .select('slug title image');

        res.json({
            ok: true,
            data: courses
        });
    },
    getCourse: async (req, res) => {
        const course = await Course.findById(req.params.course)
            .select('slug title description image units lessons sections')
            .populate('exercises', '_id courseId sectionId description');

        res.json({
            ok: true,
            data: course
        });
    },
    createCourse: async (req, res) => {
        const course = await Course.create(req.body);

        res.json({
            ok: true,
            message: 'Курс создан',
            data: course
        });
    },
    updateCourse: async (req, res) => {
        const course = await Course.findByIdAndUpdate(req.params.course, req.body, { new: true })
            .select('-units -lessons -sections -exercises');

        res.json({
            ok: true,
            message: 'Курс изменен',
            data: course
        });
    },
    deleteCourse: async (req, res) => {
        const course = await Course.findByIdAndDelete(req.params.course)
            .select('id');

        res.json({
            ok: true,
            message: 'Курс удален',
            data: {
                id: course.id
            }
        });
    },

    // Units
    createUnit: async (req, res) => {
        const unit = await Course.createUnit(req.params.course, req.body);

        res.json({
            ok: true,
            message: 'Юнит создан',
            data: unit
        });
    },
    updateUnit: async (req, res) => {
        const unit = await Course.updateUnit(req.params.course, req.params.unit, req.body);

        res.json({
            ok: true,
            message: 'Юнит изменен',
            data: unit
        });
    },
    deleteUnit: async (req, res) => {
        const unit = await Course.deleteUnit(req.params.course, req.params.unit);

        res.json({
            ok: true,
            message: 'Юнит удален',
            data: {
                id: unit.id
            }
        });
    },

    // Lessons
    createLesson: async (req, res) => {
        const lesson = await Course.createLesson(req.params.course, req.body);

        res.json({
            ok: true,
            message: 'Урок создан',
            data: lesson
        });
    },
    updateLesson: async (req, res) => {
        const lesson = await Course.updateLesson(req.params.course, req.params.lesson, req.body);

        res.json({
            ok: true,
            message: 'Урок изменен',
            data: lesson
        });
    },

    deleteLesson: async (req, res) => {
        const lesson = await Course.deleteLesson(req.params.course, req.params.lesson);

        res.json({
            ok: true,
            message: 'Урок удален',
            data: lesson
        });
    },

    // Sections
    createSection: async (req, res) => {
        const section = await Course.createSection(req.params.course, req.body);

        res.json({
            ok: true,
            message: 'Секция создана',
            data: section
        });
    },
    updateSection: async (req, res) => {
        const section = await Course.updateSection(req.params.course, req.params.section, req.body);

        res.json({
            ok: true,
            message: 'Секция изменена',
            data: section
        });
    },
    deleteSection: async (req, res) => {
        const section = await Course.deleteSection(req.params.course, req.params.section);

        res.json({
            ok: true,
            message: 'Секция удалена',
            data: section
        });
    },

    // Exercises
    getExercise: async (req, res) => {
        const exercise = await Exercise.findById(req.params.exercise);

        if (!exercise) throw {
            code: 404,
            message: 'Упражнение не найдено'
        };

        res.json({
            ok: true,
            data: exercise
        });
    },
    createExercise: async (req, res) => {
        const exercise = await Exercise.create(req.body);

        await Course.addExercise(req.params.course, exercise.sectionId, exercise.id);

        res.json({
            ok: true,
            message: 'Упражнение создано',
            data: exercise
        });
    },
    updateExercise: async (req, res) => {
        const exercise = await Exercise.findByIdAndUpdate(req.params.exercise, req.body, { new: true });

        res.json({
            ok: true,
            message: 'Упражнение изменено',
            data: exercise.toJSON()
        });
    },
    deleteExercise: async (req, res) => {
        const exercise = await Exercise.findByIdAndDelete(req.params.exercise);

        await Course.updateOne({
            _id: req.params.course
        }, {
            $pull: {
                'sections.$[s]._exercises': exercise.id
            }
        }, {
            arrayFilters: [{ 's._id': exercise.sectionId }]
        });

        res.json({
            ok: true,
            message: 'Упражнение удалено',
            data: exercise
        });
    },

    // Items
    createItem: async (req, res) => {
        const item = await Exercise.addItem(req.params.exercise, req.body);

        res.json({
            ok: true,
            message: 'Элемент создан',
            data: {
                item,
                position: req.body.position
            }
        });
    },
    updateItem: async (req, res) => {
        const item = await Exercise.updateItem(req.params.exercise, req.params.item, req.body);

        res.json({
            ok: true,
            message: 'Элемент изменен',
            data: item
        });
    },
    deleteItem: async (req, res) => {
        const item = await Exercise.removeItem(req.params.exercise, req.params.item);

        res.json({
            ok: true,
            message: 'Элемент удален',
            data: item
        });
    }
});