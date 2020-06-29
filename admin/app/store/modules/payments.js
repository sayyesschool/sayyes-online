import { createAction, createReducer, combineReducers } from 'shared/store/utils';

export const getPayments = createAction('GET_PAYMENTS', () => ({
    request: {
        method: 'get',
        url: '/payments'
    }
}));

export default combineReducers({
    list: createReducer(null, {
        [getPayments]: (state, action) => action.data
    })
});