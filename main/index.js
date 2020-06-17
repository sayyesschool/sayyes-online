const path = require('path');
const express = require('express');
const moment = require('moment');

const front = require('./front');

module.exports = core => {
    const main = express();

    main.set('view engine', 'pug');
    main.set('views', [
        core.config.APP_PATH,
        path.join(core.config.APP_PATH, 'main')
    ]);

    main.on('mount', parent => {
        main.locals.moment = moment;
        Object.assign(main.locals, parent.locals);
    });

    main.use('/', front(core.services));

    return main;
};