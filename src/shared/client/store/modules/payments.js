import { createAction, createReducer, combineReducers } from 'shared/store/helpers';

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

export const createPayment = createAction('CREATE_PAYMENT', data => ({
    request: {
        method: 'post',
        url: '/payments',
        body: data
    }
}));

export const updatePayment = createAction('UPDATE_PAYMENT', (id, data) => ({
    request: {
        method: 'put',
        url: `/payments/${id}`,
        body: data
    }
}));

export const deletePayment = createAction('DELETE_PAYMENT', id => ({
    request: {
        method: 'delete',
        url: `/payments/${id}`
    }
}));

export const setPayment = createAction('SET_PAYMENT', payment => ({
    payment
}));

export const unsetPayment = createAction('UNSET_PAYMENT');

export const paymentsReducer = createReducer(null, {
    [getPayments]: (state, action) => action.data,
    [createPayment]: (state, action) => state ? [...state, action.data] : [action.data],
    [updatePayment]: (state, action) => state && state.map(payment => payment.id !== action.data.id ? payment : action.data),
    [deletePayment]: (state, action) => state && state.filter(payment => payment.id !== action.data.id)
});

export const paymentReducer = createReducer(null, {
    [getPayment]: (state, action) => action.data,
    [setPayment]: (state, action) => action.payment,
    [unsetPayment]: (state, action) => null
});

export default combineReducers({
    list: paymentsReducer,
    single: paymentReducer
});