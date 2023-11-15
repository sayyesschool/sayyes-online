const { Router } = require('express');
const upload = require('multer')();

const Controller = require('./controller');

module.exports = core => {
    const router = Router();
    const controller = Controller(core);

    router.get('/', controller.getAccount);
    router.post('/balance', controller.increaseBalance);
    router.put('/profile', upload.single('avatar'), controller.updateProfile);
    router.put('/password', controller.updatePassword);

    return router;
};