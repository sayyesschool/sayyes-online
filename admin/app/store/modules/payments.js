import { createAction, createReducer, combineReducers } from 'shared/store/utils';
import payment from '../../../../core/models/payment';

export const getPayments = createAction('GET_PAYMENTS', () => ({
    request: {
        method: 'get',
        url: '/payments'
    }
}));

export const getPayment = createAction('GET_PAYMENT', id => ({
    request: {
        method: 'get',
        url: `/payments/${id}`
    }
}));

export const setPayment = createAction('SET_PAYMENT', payment => ({
    payment
}));

export const unsetPayment = createAction('UNSET_PAYMENT');

export const createPayment = createAction('CREATE_PAYMENT', data => ({
    request: {
        method: 'post',
        url: '/payments',
        body: data
    }
}));

export default combineReducers({
    list: createReducer(null, {
        [getPayments]: (state, action) => action.data,
        [createPayment]: (state, action) => state ? [...state, action.data] : [action.data]
    }),
    single: createReducer(null, {
        [getPayment]: (state, action) => action.data,
        [setPayment]: (state, action) => action.payment,
        [unsetPayment]: (state, action) => null
    })
});