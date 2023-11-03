import { createAction, createReducer } from 'shared/store/helpers';

export const getUser = createAction('GET_USER', () => ({
    request: {
        method: 'get',
        path: '/auth/api/user'
    }
}));

export const updateProfile = createAction('UPDATE_PROFILE', data => ({
    request: {
        method: 'put',
        path: '/auth/api/user/profile',
        body: data
    }
}));

export const updatePassword = createAction('UPDATE_PASSWORD', data => ({
    request: {
        method: 'put',
        path: '/auth/api/user/password',
        body: data
    }
}));

export const actions = {
    getUser,
    updateProfile,
    updatePassword
};

export default createReducer(null, {
    [getUser]: (state, action) => action.data,
    [updateProfile]: (state, action) => action.data
});