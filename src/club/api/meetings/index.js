const { Router } = require('express');
const Controller = require('./controller');

module.exports = core => {
    const router = Router();
    const controller = Controller(core.services);

    router.get('/', controller.index);

    return router;
};