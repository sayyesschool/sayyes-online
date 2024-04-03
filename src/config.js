const path = require('path');
const moment = require('moment-timezone');
require('moment/locale/ru');

const project = require('../package.json');

moment.locale('ru');

module.exports = {
    APP_VERSION: project.version,
    APP_IP: process.env.APP_IP || '127.0.0.1',
    APP_PORT: process.env.APP_PORT || process.env.PORT || 3000,
    APP_ENV: process.env.NODE_ENV,
    APP_DOMAIN: process.env.APP_DOMAIN,
    APP_URL: process.env.APP_URL,
    APP_PATH: path.normalize(process.env.APP_PATH || path.resolve(process.cwd(), 'src')),

    FACEBOOK_PIXEL_ID: '758563291240040',

    GOOGLE_ANALYTICS_ID: 'UA-161447925-1',

    MAILJET_API_KEY: process.env.MAILJET_API_KEY,
    MAILJET_API_SECRET: process.env.MAILJET_API_SECRET,

    MIRO_CLIENT_ID: process.env.MIRO_CLIENT_ID,
    MIRO_CLIENT_SECRET: process.env.MIRO_CLIENT_SECRET,

    MONGODB_URI: process.env.DB_CONNECTION_STRING,

    SESSION_SECRET: 'BHve6rr4mAAP2w4G93qK',
    STATIC_URL: process.env.STATIC_URL,
    STORAGE_URL: process.env.STORAGE_URL,

    SSL_CERT_PATH: process.env.SSL_CERT_PATH,
    SSL_KEY_PATH: process.env.SSL_KEY_PATH,

    TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID,
    TWILIO_API_KEY: process.env.TWILIO_API_KEY,
    TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,
    TWILIO_CHAT_SERVICE_ID: process.env.TWILIO_CHAT_SERVICE_ID,
    TWILIO_SYNC_SERVICE_ID: process.env.TWILIO_SYNC_SERVICE_ID,

    YANDEX_CLOUD_ACCESS_KEY_ID: process.env.YANDEX_CLOUD_ACCESS_KEY_ID,
    YANDEX_CLOUD_SECRET_ACCESS_KEY: process.env.YANDEX_CLOUD_SECRET_ACCESS_KEY,
    YANDEX_CLOUD_STORAGE_ENDPOINT: process.env.YANDEX_CLOUD_STORAGE_ENDPOINT,
    YANDEX_CLOUD_STORAGE_REGION: process.env.YANDEX_CLOUD_STORAGE_REGION,
    YANDEX_CLOUD_STORAGE_BUCKET: process.env.YANDEX_CLOUD_STORAGE_BUCKET,

    YANDEX_METRIKA_ID: '61110085',

    YOOKASSA_SHOP_ID: process.env.YOOKASSA_SHOP_ID,
    YOOKASSA_SECRET_KEY: process.env.YOOKASSA_SECRET_KEY,

    ZOOM_API_KEY: process.env.ZOOM_API_KEY,
    ZOOM_API_SECRET: process.env.ZOOM_API_SECRET
};