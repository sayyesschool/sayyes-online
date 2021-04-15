module.exports = ({
    models: { Pack }
}) => ({
    get: (req, res, next) => {
        Pack.find(req.query)
            .then(packs => {
                res.json({
                    ok: true,
                    data: packs
                });
            })
            .catch(next);
    },

    getOne: (req, res, next) => {
        Pack.findById(req.params.id)
            .then(pack => {
                res.json({
                    ok: true,
                    data: pack
                });
            })
            .catch(next);
    },

    create: (req, res, next) => {
        Pack.create(req.body)
            .then(pack => {
                res.json({
                    ok: true,
                    message: 'Пакет создан',
                    data: pack
                });
            })
            .catch(next);
    },

    update: (req, res, next) => {
        Pack.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(pack => {
                res.json({
                    ok: true,
                    message: 'Пакет изменен',
                    data: pack
                });
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        Pack.findByIdAndDelete(req.params.id)
            .select('id')
            .then(pack => {
                res.json({
                    ok: true,
                    message: 'Пакет удален',
                    data: pack
                });
            })
            .catch(next);
    }
});