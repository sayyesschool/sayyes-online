export default (api, apiUrl) => store => next => action => {
    if (!action.request) return next(action);

    const request = action.request;
    const [
        REQUEST = `${action.type}_REQUEST`,
        SUCCESS = action.type,
        FAILURE = `${action.type}_FAILURE`
    ] = action.types || [];

    next({ ...action, type: REQUEST, request: undefined });

    return api[request.method](`${apiUrl}${request.url}`, request.body)
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