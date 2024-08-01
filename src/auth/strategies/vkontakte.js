import passport from 'passport';
import { Strategy } from 'passport-vkontakte';

export default (Auth, { VKONTAKTE_CLIENT_ID, VKONTAKTE_CLIENT_SECRET, VKONTAKTE_CALLBACK_URL }) => {
    const config = {
        clientID: VKONTAKTE_CLIENT_ID,
        clientSecret: VKONTAKTE_CLIENT_SECRET,
        callbackURL: VKONTAKTE_CALLBACK_URL,
        profileFields: ['email'],
        passReqToCallback: true
    };

    passport.use(new Strategy(config, (req, token, refreshToken, params, profile, done) => {
        const account = {
            _id: 'vkontakte',
            title: 'ВКонтакте',
            icon: 'vk',
            userId: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            displayName: profile.displayName,
            username: profile.username,
            email: params.email || null,
            photo: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
            profileUrl: profile.profileUrl,
            token
        };

        if (req.user) {
            Auth.connect(req.user, account, done);
        } else {
            Auth.authorize(account, done);
        }
    }));

    return {
        auth: passport.authenticate('vkontakte', { scope: 'email' }),
        callback: passport.authenticate('vkontakte', Auth.options)
    };
};