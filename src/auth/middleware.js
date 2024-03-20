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
        req.user ?
            next() : 
            res.redirect(`//auth.${config.APP_DOMAIN}`);
    },

    authorizeRoles: allowedRoles => (req, res, next) => {
        allowedRoles.includes(req.user?.role) ?
            next() :
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
            res.redirect(`//auth.${config.APP_DOMAIN}`);
        else if (req.user.role === 'editor')
            res.redirect(`//cms.${config.APP_DOMAIN}`);
        else if (req.user.role === 'manager')
            res.redirect(`//crm.${config.APP_DOMAIN}`);
        else if (req.user.role === 'learner' || req.user.role === 'teacher')
            res.redirect(`//lms.${config.APP_DOMAIN}`);
        else
            next();
    }
});