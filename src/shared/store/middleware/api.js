export default (httpClient, baseUrl) => store => next => action => {
    if (!action.request) return next(action);

    const [
        REQUEST = `${action.type}_REQUEST`,
        SUCCESS = action.type,
        FAILURE = `${action.type}_FAILURE`
    ] = action.types || [];

    next({ ...action, type: REQUEST, request: undefined });

    const { method, path, query = '', body } = action.request;
    const qs = new URLSearchParams(query).toString();
    const url = (path.startsWith('http') || path.startsWith('/') ? path : `${baseUrl}/${path}`) + (qs ? `?${qs}` : '');

    return httpClient[method](url, body)
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