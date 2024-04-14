export default ({
    models: { Pack }
}) => ({
    getMany: (req, res, next) => {
        Pack.find({ ...req.query })
            .sort({ hours: -1 })
            .then(packs => {
                res.json({
                    ok: true,
                    data: packs
                });
            })
            .catch(next);
    }
});