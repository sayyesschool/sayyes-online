const connectMongo = require('connect-mongo');
const expressSession = require('express-session');

const MongoStore = connectMongo(expressSession);

module.exports = ({ APP_ENV, APP_DOMAIN, SESSION_SECRET }, connection) => expressSession({
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
        mongooseConnection: connection,
        ttl: 60 * 60 * 24 * 3, // 3 days
        touchAfter: 60 * 60 * 24, // 1 day
        stringify: false
    })
});