export default (api, apiUrl) => store => next => action => {
    if (!action.request) return next(action);

    const [
        REQUEST = `${action.type}_REQUEST`,
        SUCCESS = action.type,
        FAILURE = `${action.type}_FAILURE`
    ] = action.types || [];

    next({ ...action, type: REQUEST, request: undefined });

    const { method, url: path, query, body } = action.request;
    const qs = typeof query === 'object' ? new URLSearchParams(query).toString() : query;
    const url = apiUrl + path + (qs ? `?${qs}` : '');

    return api[method](url, body)
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