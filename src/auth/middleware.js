export default ({
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
        req.user
            ? next()
            : res.redirect(`//auth.${APP_DOMAIN}`);
    },

    authorizeRoles: allowedRoles => (req, res, next) => {
        req.user?.is(allowedRoles)
            ? next()
            : res.redirect(`//auth.${APP_DOMAIN}`);
    },

    authenticatedRoute: (req, res, next) => {
        req.user ? next() : next('route');
    },

    authenticatedRouter: (req, res, next) => {
        req.user ? next() : next('router');
    },

    redirect: (req, res, next) => {
        if (req.query.redirect)
            res.redirect(`//${req.query.redirect}`);
        else if (!req.user)
            res.redirect(`//auth.${APP_DOMAIN}`);
        else if (req.user.is('member'))
            res.redirect(`//club.${APP_DOMAIN}`);
        else if (req.user.is('editor'))
            res.redirect(`//cms.${APP_DOMAIN}`);
        else if (req.user.is('manager'))
            res.redirect(`//crm.${APP_DOMAIN}`);
        else if (req.user.is('learner', 'teacher'))
            res.redirect(`//lms.${APP_DOMAIN}`);
        else
            next();
    }
});