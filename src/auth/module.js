import { resolve } from 'node:path';

import local from './local';
import middleware from './middleware';

export default (app, context) => {
    const { redirect } = middleware(context);

    app.set('views', resolve(context.config.APP_PATH, `${app.get('name')}/local/views`));

    app.use(local(context));
    app.use(redirect);

    return app;
};