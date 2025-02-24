import api from './api';
import pages from './pages';

export default (app, context) => {
    Object.assign(app.locals, {
        titleBase: 'Оплата SAY YES',
        PAY_APP_URL: `https://${app.get('name')}.${context.config.APP_DOMAIN}`,
        CONTACT_EMAIL: `info@${context.config.APP_DOMAIN}`
    });

    app.use('/api', api(context));
    app.use(pages(context));

    return app;
};