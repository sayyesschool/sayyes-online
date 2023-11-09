import { createAction, createReducer } from 'shared/store/helpers';

export const updateProfile = createAction('UPDATE_PROFILE', data => ({
    request: {
        method: 'put',
        path: '/account/profile',
        body: data
    }
}));

export const updatePassword = createAction('UPDATE_PASSWORD', data => ({
    request: {
        method: 'put',
        path: '/account/password',
        body: data
    }
}));

export const actions = {
    updateProfile,
    updatePassword
};

export default createReducer(null, {
    [updateProfile]: (state, action) => action.data
});