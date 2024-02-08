const connectMongo = require('connect-mongo');
const expressSession = require('express-session');

const MongoStore = connectMongo(expressSession);

module.exports = ({ APP_DOMAIN, SESSION_SECRET }, dbConnection) => expressSession({
    name: 'sessionId',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        domain: `.${APP_DOMAIN}`,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days
    },
    store: new MongoStore({
        mongooseConnection: dbConnection,
        ttl: 60 * 60 * 24 * 3, // 3 days
        touchAfter: 60 * 60 * 24, // 1 day
        stringify: false
    })
});