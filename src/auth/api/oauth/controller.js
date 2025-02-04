export default ({
    services: { Auth, Mail }
}, strategies) => ({
    authenticate(req, res, next) {
        const strategy = strategies[req.body.provider];

        if (!strategy) throw new Error('Провайдер не найден');

        if (req.body.returnUrl) {
            req.session.returnUrl = req.body.returnUrl;
        }

        strategy.auth(req, res, next);
    },

    callback(req, res, next) {
        const strategy = strategies[req.body.provider];

        if (!strategy) throw new Error('Провайдер не найден');

        strategy.callback(req, res, next);
    },

    connect(req, res, next) {
        const strategy = strategies[req.body.provider];

        if (!strategy) throw new Error('Провайдер не найден');

        strategy.auth(req, res, next);
    }
});