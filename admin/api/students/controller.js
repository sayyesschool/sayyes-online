module.exports = ({ Student }) => ({
    get: (req, res, next) => {
        const search = req.query.search;
        const query = search ? {
            $or: [
                { firstname: search },
                { lastname: search },
                { email: search },
                { phone: search }
            ]
        } : req.query;

        Student.get(query)
            .then(students => {
                res.json({
                    ok: true,
                    data: students
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Student.getById(req.params.id)
            .then(student => {
                res.json({
                    ok: true,
                    data: student
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Student.create(req.body)
            .then(student => {
                res.json({
                    ok: true,
                    message: 'Пользователь создан',
                    data: student
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Student.update(req.params.id, req.body)
            .then(student => {
                res.json({
                    ok: true,
                    message: 'Пользователь изменен',
                    data: student
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Student.delete(req.params.id)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Пользователь удален'
                });
            })
            .catch(next);
    }
});