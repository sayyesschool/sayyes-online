import tilda from './tilda';
import yookassa from './yookassa';
import zoom from './zoom';

export default (app, context) => {
    app.use('/tilda', tilda(context));
    app.use('/yookassa', yookassa(context));
    app.use('/zoom', zoom(context));

    return app;
};