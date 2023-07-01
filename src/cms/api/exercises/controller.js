module.exports = ({
    models: { Course, Exercise }
}) => ({
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
        const exercise = await Exercise.findByIdAndUpdate(req.params.exercise, req.body);

        res.json({
            ok: true,
            message: 'Упражнение изменено',
            data: exercise.toJSON()
        });
    },

    deleteExercise: async (req, res) => {
        const exercise = await Exercise.findByIdAndDelete(req.params.exercise);

        await Course.updateOne(req.params.course, {
            $pull: {
                'sections.$[s]._exercises': exercise.id
            }
        }, {
            arrayFilters: [{ 's._id': exercise.sectionId }],
        });

        res.json({
            ok: true,
            message: 'Упражнение удалено',
            data: exercise
        });
    },

    createItem: async (req, res) => {
        const item = await Exercise.addItem(req.params.exercise, req.body);

        res.json({
            ok: true,
            message: 'Элемент создан',
            data: item
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