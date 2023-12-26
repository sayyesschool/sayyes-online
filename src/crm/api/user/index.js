const { Router } = require('express');
const upload = require('multer')();
const Controller = require('./controller');

module.exports = context => {
    const router = Router();
    const controller = Controller(context);

    router.get('/', controller.getUser);
    router.put('/profile', upload.single('avatar'), controller.updateProfile);
    router.put('/password', controller.updatePassword);

    router.use((error, req, res, next) => {
        res.status(error.code || error.status || 500).send({
            ok: false,
            error: typeof error === 'object' ? error.message : undefined
        });
    });

    return router;
};