import { AUTH_URL } from 'shared/constants';
import { createAction, createReducer } from 'shared/store/helpers';

export const getUser = createAction('GET_USER', () => ({
    request: {
        method: 'get',
        path: AUTH_URL + '/user'
    }
}));

export const updateProfile = createAction('UPDATE_USER', (userId, data) => ({
    request: {
        method: 'put',
        path: AUTH_URL + `/user/${userId}`,
        body: data
    }
}));

export const actions = {
    getUser,
    updateProfile
};

export default createReducer(null, {
    [getUser]: (state, action) => action.data,
    [updateProfile]: (state, action) => state && ({ ...state, ...action.data })
});