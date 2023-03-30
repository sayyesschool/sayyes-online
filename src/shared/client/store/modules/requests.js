import { createAction, createReducer, combineReducers } from 'shared/store/helpers';

export const getRequests = createAction('GET_REQUESTS', () => ({
    request: {
        method: 'get',
        url: '/requests'
    }
}));

export const getNewRequests = createAction('GET_NEW_REQUESTS', () => ({
    request: {
        method: 'get',
        url: '/requests/new'
    }
}));

export const getRequest = createAction('GET_REQUEST', id => ({
    request: {
        method: 'get',
        url: `/requests/${id}`
    }
}));

export const setRequest = createAction('SET_REQUEST', request => ({
    data: request
}));

export const unsetRequest = createAction('UNSET_REQUEST');

export const createRequest = createAction('CREATE_REQUEST', data => ({
    request: {
        method: 'post',
        url: '/requests',
        body: data
    }
}));

export const updateRequest = createAction('UPDATE_REQUEST', (requestId, data) => ({
    request: {
        method: 'put',
        url: `/requests/${requestId}`,
        body: data
    }
}));

export const deleteRequest = createAction('DELETE_REQUEST', requestId => ({
    request: {
        method: 'delete',
        url: `/requests/${requestId}`
    }
}));

export default combineReducers({
    list: createReducer(null, {
        [getRequests]: (state, action) => action.data,
        [getNewRequests]: (state, action) => [...state, ...action.data],
        [createRequest]: (state, action) => state ? [...state, action.data] : [action.data],
        [updateRequest]: (state, action) => state.map(r => r.id !== action.data.id ? r : { ...r, ...action.data }),
        [deleteRequest]: (state, action) => state.filter(r => r.id !== action.data.requestId)
    }),

    single: createReducer(null, {
        [getRequest]: (state, action) => action.data,
        [setRequest]: (state, action) => action.data,
        [unsetRequest]: (state, action) => null,
        [updateRequest]: (state, action) => ({ ...state, ...action.data }),
        [deleteRequest]: (state, action) => null
    })
});