import { createAction, createReducer, combineReducers } from 'shared/store/utils';

export const getUsers = createAction('GET_USERS', query => ({
    request: {
        method: 'get',
        url: '/users' + (query ? ('?' + query) : '')
    }
}));

export const getUser = createAction('GET_USER', userId => ({
    request: {
        method: 'get',
        url: `/users/${userId}`
    }
}));

export const createUser = createAction('CREATE_USER', data => ({
    request: {
        method: 'post',
        url: '/users',
        body: data
    }
}));

export const updateUser = createAction('UPDATE_USER', (userId, data) => ({
    request: {
        method: 'put',
        url: `/users/${userId}`,
        body: data
    }
}));

export const deleteUser = createAction('DELETE_USER', (userId, data) => ({
    request: {
        method: 'put',
        url: `/users/${userId}`,
        body: data
    }
}));

export default combineReducers({
    list: createReducer(null, {
        [getUsers]: (state, action) => action.data,
        [createUser]: (state, action) => [...state, action.data]
    }),

    single: createReducer(null, {
        [getUser]: (state, action) => action.data,
        [updateUser]: (state, action) => action.data,
        [deleteUser]: (state, action) => null
    })
});