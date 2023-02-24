const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (Auth, { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, FACEBOOK_CALLBACK_URL }) => {
    const config = {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'name', 'displayName', 'email', 'photos'],
        passReqToCallback: true
    };

    passport.use(new FacebookStrategy(config, (req, token, refreshToken, profile, done) => {
        const account = {
            _id: 'facebook',
            title: 'Facebook',
            icon: 'facebook',
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
            Auth.connect(req.user, account, done);
        } else {
            Auth.authorize(account, done);
        }
    }));

    return {
        auth: passport.authenticate('facebook', { scope: ['email'] }),
        callback: passport.authenticate('facebook', Auth.options)
    };
};