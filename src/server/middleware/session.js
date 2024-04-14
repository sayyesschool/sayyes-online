import connectMongo from 'connect-mongo';
import expressSession from 'express-session';

const MongoStore = connectMongo(expressSession);

export default ({ APP_DOMAIN, SESSION_SECRET }, dbConnection) => expressSession({
    name: 'sessionId',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        domain: `.${APP_DOMAIN}`,
        httpOnly: true,
        sameSite: false,
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