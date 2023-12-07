import { AUTH_URL } from 'shared/constants';
import { createAction, createReducer } from 'shared/store/helpers';

export const getUser = createAction('GET_USER', () => ({
    request: {
        method: 'get',
        path: AUTH_URL + '/user'
    }
}));

export const actions = {
    getUser
};

export default createReducer(null, {
    [getUser]: (state, action) => action.data
});