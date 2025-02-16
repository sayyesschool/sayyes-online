import { resolve } from 'node:path';

import api from './api';
import pages from './pages';

export default (app, context) => {
    app.set('views', resolve(context.config.APP_PATH, app.get('name')));

    Object.assign(app.locals, context.config, {
        PAY_APP_URL: `https://${app.get('name')}.${context.config.APP_DOMAIN}`,
        CONTACT_EMAIL: `info@${context.config.APP_DOMAIN}`,
        basedir: context.config.APP_PATH,
        titleBase: 'Оплата Say Yes'
    });

    app.use('/api', api(context));
    app.use(pages(context));

    return app;
};