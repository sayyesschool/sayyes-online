import Controller from './controller';

export default (context, router) => {
    const controller = Controller(context);

    router.get('/pay', controller.index);
    router.post('/pay', controller.payment);
    router.put('/pay', controller.email);

    return router;
};