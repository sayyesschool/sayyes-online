import { AUTH_URL } from 'shared/constants';
import { createAction, createReducer } from 'shared/store/helpers';
import { updateAvatar, updateProfile } from 'shared/store/modules/account.js';

export const getUser = createAction('GET_USER', () => ({
    request: {
        method: 'get',
        path: AUTH_URL + '/user'
    }
}));

export const actions = { getUser };

export default createReducer(null, {
    [getUser]: (state, action) => action.data,
    [updateProfile]: (state, action) => action.data,
    [updateAvatar]: (state, action) => ({ ...state, image: action.data.image })
});