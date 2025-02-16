import api from './api';

export default (app, context) => {
    app.use('/api', api(context));
    app.use((req, res) => res.render('app', {
        titleBase: 'Личный кабинет'
    }));

    return app;
};