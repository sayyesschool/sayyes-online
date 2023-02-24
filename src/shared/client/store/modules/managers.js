import { createAction, createReducer, combineReducers } from 'shared/store/utils';

export const getManagers = createAction('GET_MANAGERS', query => ({
    request: {
        method: 'get',
        url: '/managers' + (query ? ('?' + query) : '')
    }
}));

export const getManager = createAction('GET_MANAGER', id => ({
    request: {
        method: 'get',
        url: `/managers/${id}`
    }
}));

export const createManager = createAction('CREATE_MANAGER', data => ({
    request: {
        method: 'post',
        url: '/managers',
        body: data
    }
}));

export const updateManager = createAction('UPDATE_MANAGER', (id, data) => ({
    request: {
        method: 'put',
        url: `/managers/${id}`,
        body: data
    }
}));

export const deleteManager = createAction('DELETE_MANAGER', (id, data) => ({
    request: {
        method: 'delete',
        url: `/managers/${id}`,
        body: data
    }
}));

export default combineReducers({
    list: createReducer(null, {
        [getManagers]: (state, action) => action.data,
        [createManager]: (state, action) => [...state, action.data]
    }),

    single: createReducer(null, {
        [getManager]: (state, action) => action.data,
        [updateManager]: (state, action) => action.data,
        [deleteManager]: (state, action) => null
    })
});