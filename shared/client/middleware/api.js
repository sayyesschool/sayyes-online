import api from '../api';

const apiMiddleware = apiUrl => store => next => action => {
    if (!action.request) {
        return next(action);
    }

    let REQUEST, SUCCESS, FAILURE;

    if (action.types) {
        [REQUEST, SUCCESS, FAILURE] = action.types;
    } else {
        REQUEST = `${action.type}_REQUEST`;
        SUCCESS = action.type;
        FAILURE = `${action.type}_FAILURE`;
    }

    next({ ...action, type: REQUEST, request: undefined });

    return api[action.request.method](`${apiUrl}${action.request.url}`, action.request.body)
        .then(data => {
            next({
                type: SUCCESS,
                ...data
            });

            return data;
        })
        .catch(error => {
            next({
                type: FAILURE,
                error
            });

            return Promise.reject(error);
        });
};

export default apiMiddleware;