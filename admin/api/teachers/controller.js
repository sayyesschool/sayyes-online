module.exports = ({ Teacher }) => ({
    get: (req, res, next) => {
        const query = req.query ? req.query : {};

        Teacher.get(query)
            .then(teachers => {
                res.json({
                    ok: true,
                    data: teachers
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Teacher.getById(req.params.id)
            .then(teacher => {
                res.json({
                    ok: true,
                    data: teacher
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Teacher.create(req.body)
            .then(teacher => {
                res.json({
                    ok: true,
                    message: 'Пользователь создан',
                    data: teacher
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Teacher.update(req.params.id, req.body)
            .then(teacher => {
                res.json({
                    ok: true,
                    message: 'Пользователь изменен',
                    data: teacher
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Teacher.delete(req.params.id)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Пользователь удален'
                });
            })
            .catch(next);
    }
});