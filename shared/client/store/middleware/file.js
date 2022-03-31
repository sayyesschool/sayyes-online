import { uploadFile, deleteFile } from 'shared/services/storage';

const fileMiddleware = store => next => action => {
    if (!action.request?.body?.file) return next(action);

    const { method, body } = action.request;

    if (method === 'post' || method === 'put') {
        return uploadFile(body.file, {
            name: body.image,
            path: body.path
        }).then(response => {
            body.image = response.name;
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
    } else if (method === 'delete' && body.imageUrl) {
        return deleteFile(body.imageUrl)
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

export default fileMiddleware;