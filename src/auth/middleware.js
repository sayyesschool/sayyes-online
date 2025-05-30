export default ({
    config: { APP_DOMAIN, RECAPTCHA_SECRET_KEY },
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
        if (!req.user)
            res.redirect(getRedirectUrl(APP_DOMAIN, req));
        else
            next();
    },

    authorizeDomain: domain => (req, res, next) => {
        if (!req.user)
            res.redirect(getRedirectUrl(APP_DOMAIN, req));
        else if (req.user.hasDomain(domain))
            next();
        else
            res.status(403).send('Нет доступа к этому разделу');
    },

    authorizeRoles: allowedRoles => (req, res, next) => {
        if (!req.user)
            res.redirect(getRedirectUrl(APP_DOMAIN, req));
        else if (req.user?.is(allowedRoles))
            next();
        else
            res.status(403).send('Нет доступа к этому разделу');
    },

    authenticatedRoute: (req, res, next) => {
        req.user ? next() : next('route');
    },

    authenticatedRouter: (req, res, next) => {
        req.user ? next() : next('router');
    },

    redirect: (req, res, next) => {
        if (!req.user)
            res.redirect(getRedirectUrl(APP_DOMAIN, req));
        else if (req.query.redirect)
            res.redirect(req.query.redirect);
        else if (req.user.hasDomain('crm'))
            res.redirect(`//crm.${APP_DOMAIN}`);
        else if (req.user.hasDomain('cms'))
            res.redirect(`//cms.${APP_DOMAIN}`);
        else if (req.user.hasDomain('lms'))
            res.redirect(`//lms.${APP_DOMAIN}`);
        else if (req.user.hasDomain('club'))
            res.redirect(`//club.${APP_DOMAIN}`);
        else if (req.user.hasDomain('lk'))
            res.redirect(`//lk.${APP_DOMAIN}`);
        else
            next();
    },

    recaptcha: async (req, res, next) => {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ error: 'Не указан токен' });
        }

        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            body: JSON.stringify({
                secret: RECAPTCHA_SECRET_KEY,
                response: token
            })
        });

        const data = await response.json();

        if (!data.success) {
            return res.status(400).json({ error: 'Подтверждение не пройдено' });
        }

        next();
    }
});

function getRedirectUrl(domain, req) {
    const baseHost = `auth.${domain}`;
    const loginUrl = `//${baseHost}/login`;

    if (req.query.redirect) {
        return `${loginUrl}?redirect=${req.query.redirect}`;
    } else if (req.host !== baseHost) {
        return `${loginUrl}?redirect=//${req.host}${req.originalUrl}`;
    } else {
        return loginUrl;
    }
}