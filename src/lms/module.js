import api from './api';

export default (app, context) => {
    app.use(context.middleware.authorizeDomain('lms'));
    app.use('/api', api(context));
    app.use((req, res) => res.render('app', {
        titleBase: 'LMS'
    }));

    return app;
};