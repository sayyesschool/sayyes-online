import passport from 'passport';
import { Strategy } from 'passport-yandex';

export default ({
    config: { YANDEX_CLIENT_ID, YANDEX_CLIENT_SECRET, YANDEX_CALLBACK_URL },
    services: { Auth }
}) => {
    const config = {
        clientID: YANDEX_CLIENT_ID,
        clientSecret: YANDEX_CLIENT_SECRET,
        callbackURL: YANDEX_CALLBACK_URL,
        passReqToCallback: true
    };

    passport.use(new Strategy(config, (req, token, refreshToken, profile, done) => {
        const account = {
            _id: 'yandex',
            title: 'Яндекс',
            icon: 'yandex',
            userId: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            displayName: profile.displayName,
            username: profile.username,
            email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
            photo: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
            profileUrl: profile.profileUrl,
            token
        };

        if (req.user) {
            Auth.connectAccount(req.user, account, done);
        } else {
            Auth.authorizeAccount(account, done);
        }
    }));

    return {
        auth: passport.authenticate('yandex'),
        callback: passport.authenticate('yandex', Auth.options)
    };
};