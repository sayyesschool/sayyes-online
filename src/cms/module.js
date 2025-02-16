import api from './api';

export default (app, context) => {
    app.use(context.middleware.authorizeDomain('cms'));
    app.use('/api', api(context));
    app.use((req, res) => res.render('app', {
        titleBase: 'CMS'
    }));

    return app;
};