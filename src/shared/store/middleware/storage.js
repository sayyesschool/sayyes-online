import Storage from 'shared/services/storage';

const storageMiddleware = store => next => action => {
    if (!action.request?.body?.file) return next(action);

    const { method, body } = action.request;

    const isDelete = method === 'delete';
    const isPost = method === 'post';
    const isPut = method === 'put';

    if (
        isDelete ||
        ((isPost || isPut) && body.file.delete)
    ) {
        return Storage.delete(body.file.url)
            .then(() => {
                delete body.file;

                return next(action);
            })
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
    } else if (isPost || isPut) {
        const file = body.file;

        return Storage.upload(file, {
            name: file.name,
            path: file.path
        }).then(response => {
            if (typeof body.props === 'object') {
                body.props.path = response.data.path;
            }

            if (typeof body.image === 'object') {
                body.image.path = response.data.path;
                body.image.url = response.data.url;
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
    } else {
        return next(action);
    }
};

export default storageMiddleware;