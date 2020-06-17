const { Router } = require('express');

const Controller = require('./controller');

module.exports = services => {
    const router = Router();
    const controller = Controller(services);

    router.get('/', controller.getMany);

    return router;
};