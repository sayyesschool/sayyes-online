const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (Auth, { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL }) => {
    const config = {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    };

    passport.use(new GoogleStrategy(config, (req, token, refreshToken, profile, done) => {
        const account = {
            _id: 'google',
            title: 'Google',
            icon: 'google',
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
        auth: passport.authenticate('google', { scope: ['profile', 'email'] }),
        callback: passport.authenticate('google', Auth.options)
    };
};