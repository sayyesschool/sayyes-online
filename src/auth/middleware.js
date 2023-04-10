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
        if (req.user) return next();

        res.redirect(`//auth.${config.APP_DOMAIN}`);
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

    redirectUser: (req, res, next) => {
        if (!req.user) return next();

        if (req.user.role === 'editor')
            return res.redirect('/cms');
        if (req.user.role === 'manager')
            return res.redirect('/crm');
        if (req.user.role === 'client')
            return res.redirect('/client');
        if (req.user.role === 'teacher')
            return res.redirect('/teacher');

        next();
    }
});