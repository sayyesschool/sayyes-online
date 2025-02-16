import api from './api';

export default (app, context) => {
    app.use(context.middleware.authorizeDomain('crm'));
    app.use('/api', api(context));
    app.use((req, res) => res.render('app', {
        titleBase: 'CRM | Say Yes'
    }));

    return app;
};