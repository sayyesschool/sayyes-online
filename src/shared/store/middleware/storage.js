import Storage from 'shared/services/storage';

const storageMiddleware = store => next => action => {
    if (!action.request?.body?.file) return next(action);

    const { method, body } = action.request;

    if (method === 'post' || method === 'put') {
        const file = body.file;

        return Storage.upload(file, {
            name: file.name,
            path: file.path
        }).then(response => {
            if (typeof body.props === 'object') {
                body.props.path = response.data.path;
            }

            delete body.file;

            return next(action);
        }).catch(error => {
            next({ type: 'HIDE_NOTIFICATION' });
            next({
                type: 'SHOW_NOTIFICATION',
                notification: {
                    active: true,
                    type: 'error',
                    text: error.message || error
                }
            });
        });
    } else if (method === 'delete') {
        return Storage.delete(body.file.url)
            .then(() => next(action))
            .catch(error => {
                next({ type: 'HIDE_NOTIFICATION' });
                next({
                    type: 'SHOW_NOTIFICATION',
                    notification: {
                        active: true,
                        type: 'error',
                        text: error.message || error
                    }
                });
            });
    } else {
        return next(action);
    }
};

export default storageMiddleware;