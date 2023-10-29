module.exports = ({
    config,
    models: { User }
}) => ({
    authenticate: (req, res, next) => {
        if (!req.session.userId) return next();

        User.findById(req.session.userId).then(user => {
            req.user = user;
            res.locals.user = user;

            next();
        });
    },

    authorize: (req, res, next) => {
        if (req.user)
            next();
        else
            res.redirect(`${config.APP_DOMAIN}/auth`);
    },

    authorizeByRole: allowedRoles => (req, res, next) => {
        if (allowedRoles.include(req.user?.role)) return next();

        res.redirect(`//auth.${config.APP_DOMAIN}`);
    },

    authenticatedRoute: (req, res, next) => {
        req.user ? next() : next('route');
    },

    authenticatedRouter: (req, res, next) => {
        req.user ? next() : next('router');
    },

    redirect: (req, res, next) => {
        if (!req.user)
            res.redirect('/auth');
        else if (req.user.role === 'editor')
            res.redirect('/cms');
        else if (req.user.role === 'manager')
            res.redirect('/crm');
        else if (req.user.role === 'client' || req.user.role === 'teacher')
            res.redirect('/lms');
        else
            next();
    }
});