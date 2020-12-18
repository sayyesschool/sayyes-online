const { Router } = require('express');
const Controller = require('./controller');
const map = require('./mapper');

module.exports = services => {
    const router = Router();
    const controller = Controller(services, map);
    
    router.get('/', controller.get);
    router.get('/active', controller.getOne);
    router.post('/', controller.buy);

    return router;
};