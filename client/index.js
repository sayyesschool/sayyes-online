const express = require('express');

const auth = require('./auth');
const api = require('./api');

module.exports = core => {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', __dirname);

    app.on('mount', parent => {
        Object.assign(app.locals, parent.locals);
    });

    app.use(auth);
    app.use('/api', api(core));
    app.use((req, res) => res.render('index'));

    return app;
};