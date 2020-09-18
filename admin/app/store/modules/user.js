import { createAction, createReducer } from 'shared/store/utils';

export const getUser = createAction('GET_USER', () => ({
    request: {
        method: 'get',
        url: '/users/me'
    }
}));

export default createReducer(null, {
    [getUser]: (state, action) => action.data
});