module.exports = ({
    models: { Assignment }
}) => ({
    async getMany(req, res) {
        const assignments = await Assignment.find({ ...req.query });

        res.json({
            ok: true,
            data: assignments
        });
    },

    async getOne(req, res, next) {
        const assignment = await Assignment.findById(req.params.id)
            .populate('enrollment', 'domain')
            .populate('exercises');

        if (!assignment) {
            const error = new Error('Задание не найдена');
            error.status = 404;
            return next(error);
        }

        res.json({
            ok: true,
            data: assignment
        });
    },

    async create(req, res) {
        const assignment = await Assignment.create(req.body);

        res.json({
            ok: true,
            message: 'Задание создано',
            data: assignment
        });
    },

    async update(req, res) {
        const assignment = await Assignment.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true,
            projection: Object.keys(req.body)
        });

        res.json({
            ok: true,
            message: 'Задание обновлено',
            data: assignment
        });
    },

    async delete(req, res) {
        const assignment = await Assignment.findOneAndDelete({
            _id: req.params.id
        });

        res.json({
            ok: true,
            message: 'Задание удалено',
            data: {
                id: assignment.id,
                enrollmentId: assignment.enrollmentId
            }
        });
    }
});