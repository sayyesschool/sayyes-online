import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT_PATH = process.env.PWD || path.normalize(path.resolve(process.cwd()));
const VERSION = process.env.npm_package_version || readFileSync(path.resolve(ROOT_PATH, 'package.json'), 'utf8').version;

export default {
    NODE_ENV: process.env.NODE_ENV,

    APP_DOMAIN: process.env.APP_DOMAIN,
    APP_ENV: process.env.APP_ENV,
    APP_IP: process.env.APP_IP || '127.0.0.1',
    APP_PATH: path.resolve(ROOT_PATH, 'src'),
    APP_PORT: process.env.APP_PORT || process.env.PORT || 3000,
    APP_URL: process.env.APP_URL,
    APP_VERSION: VERSION,

    EMAIL_DOMAIN: process.env.EMAIL_DOMAIN,

    FACEBOOK_PIXEL_ID: '758563291240040',

    GOOGLE_ANALYTICS_ID: 'UA-161447925-1',

    MAILJET_API_KEY: process.env.MAILJET_API_KEY,
    MAILJET_API_SECRET: process.env.MAILJET_API_SECRET,

    MIRO_CLIENT_ID: process.env.MIRO_CLIENT_ID,
    MIRO_CLIENT_SECRET: process.env.MIRO_CLIENT_SECRET,

    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,

    HH_REQUEST_URL: 'https://sayes.t8s.ru/Api/V2/AddStudyRequest',

    RECAPTCHA_PUBLIC_KEY: process.env.RECAPTCHA_PUBLIC_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,

    SESSION_SECRET: 'BHve6rr4mAAP2w4G93qK',

    SSL_CERT_PATH: process.env.SSL_CERT_PATH,
    SSL_KEY_PATH: process.env.SSL_KEY_PATH,

    STATIC_URL: process.env.STATIC_URL,
    STORAGE_URL: process.env.STORAGE_URL,

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

    YANDEX_METRIKA_ID: process.env.YANDEX_METRIKA_ID,
    YANDEX_METRIKA_ID_CLUB: process.env.YANDEX_METRIKA_ID_CLUB,

    YOOKASSA_SHOP_ID: process.env.YOOKASSA_SHOP_ID,
    YOOKASSA_SECRET_KEY: process.env.YOOKASSA_SECRET_KEY,

    ZOOM_ACCOUNT_ID: process.env.ZOOM_ACCOUNT_ID,
    ZOOM_CLIENT_ID: process.env.ZOOM_CLIENT_ID,
    ZOOM_CLIENT_SECRET: process.env.ZOOM_CLIENT_SECRET,
    ZOOM_USER_ID: process.env.ZOOM_USER_ID
};