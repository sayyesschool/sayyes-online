export default ({
    services: { Settings }
}) => ({
    async getAll(req, res) {
        const settings = await Settings.getAll();

        const data = settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value;

            return acc;
        }, {});

        res.json({
            ok: true,
            data
        });
    },

    async get(req, res) {
        const setting = await Settings.get(req.params.key);

        res.json({
            ok: true,
            data: setting
        });
    },

    async set(req, res) {
        const setting = await Settings.set(req.params.key, req.body);

        res.json({
            ok: true,
            message: 'Настройка сохранена',
            data: setting
        });
    }
});