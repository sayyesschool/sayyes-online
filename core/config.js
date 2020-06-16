const path = require('path');
const moment = require('moment-timezone');
require('moment/locale/ru');

moment.locale('ru');

const project = require('../package.json');

module.exports = {
    APP_VERSION: project.version,
    APP_IP: process.env.APP_IP || '127.0.0.1',
    APP_PORT: process.env.APP_PORT || process.env.PORT || 80,
    APP_ENV: process.env.NODE_ENV,
    APP_DOMAIN: process.env.APP_DOMAIN,
    APP_URL: process.env.APP_URL,
    APP_PATH: path.normalize(process.env.APP_PATH || process.cwd()),

    MAILJET_API_KEY: process.env.MAILJET_API_KEY,
    MAILJET_API_SECRET: process.env.MAILJET_API_SECRET,

    MONGODB_URI: process.env.DB_CONNECTION_STRING,

    SESSION_SECRET: 'BHve6rr4mAAP2w4G93qK',

    TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID,
    TWILIO_API_KEY: process.env.TWILIO_API_KEY,
    TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,

    YANDEX_KASSA_SHOP_ID: process.env.YANDEX_KASSA_SHOP_ID,
    YANDEX_KASSA_SECRET: process.env.YANDEX_KASSA_SECRET,

    ZOOM_API_KEY: process.env.ZOOM_API_KEY,
    ZOOM_API_SECRET: process.env.ZOOM_API_SECRET

    // paths: {
    //     public: path.join(APP_PATH, 'public'),
    //     favicon: path.join(APP_PATH, 'public', 'favicon.ico'),
    //     views: path.join(APP_PATH, 'shared', 'views'),
    //     lib: path.join(APP_PATH, 'node_modules')
    // }
};