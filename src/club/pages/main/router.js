import controller from './controller';

export default (context, router) => {
    router.get('/', controller(context));

    return router;
};