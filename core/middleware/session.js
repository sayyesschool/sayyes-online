const expressSession = require('express-session');
const connectMongo = require('connect-mongo');

const { APP_ENV, APP_DOMAIN, SESSION_SECRET } = require('../config');
const database = require('../database');

const MongoStore = connectMongo(expressSession);

module.exports = expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',
    cookie: {
        domain: APP_DOMAIN,
        httpOnly: true,
        secure: APP_ENV === 'production',
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days
    },
    store: new MongoStore({
        mongooseConnection: database,
        ttl: 60 * 60 * 24 * 3, // 3 days
        touchAfter: 60 * 60 * 24, // 1 day
        stringify: false
    })
});