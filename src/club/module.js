import api from './api';
import pages, { routes } from './pages';

export default (app, context) => {
    Object.assign(app.locals, {
        titleBase: 'Разговорный клуб SAY YES',
        CLUB_URL: `https://club.${context.config.APP_DOMAIN}`,
        CLUB_EMAIL: `club@${context.config.APP_DOMAIN}`
    });

    app.use('/api', api(context));
    app.use((req, res, next) => {
        if (routes.includes(req.url)) {
            next();
        } else if (req.user && req.user.hasDomain('club')) {
            res.render('app');
        } else {
            next();
        }
    });
    app.use(pages(context));

    return app;
};