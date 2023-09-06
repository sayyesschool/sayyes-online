const notificationMiddleware = store => next => action => {
    if (action.message) {
        next({ type: 'HIDE_NOTIFICATION' });

        next({
            type: 'SHOW_NOTIFICATION',
            notification: {
                active: true,
                type: 'success',
                text: action.message
            }
        });
    } else if (action.error) {
        next({ type: 'HIDE_NOTIFICATION' });

        next({
            type: 'SHOW_NOTIFICATION',
            notification: {
                active: true,
                type: 'error',
                text: action.error.message || action.error
            }
        });
    }

    return next(action);
};

export default notificationMiddleware;