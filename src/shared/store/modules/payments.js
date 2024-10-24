import { combineReducers, createAction, createReducer } from 'shared/store/helpers';

export const getPayments = createAction('GET_PAYMENTS', () => ({
    request: {
        method: 'get',
        path: 'payments'
    }
}));

export const getPayment = createAction('GET_PAYMENT', id => ({
    request: {
        method: 'get',
        path: `payments/${id}`
    }
}));

export const createPayment = createAction('CREATE_PAYMENT', data => ({
    request: {
        method: 'post',
        path: 'payments',
        body: data
    }
}));

export const updatePayment = createAction('UPDATE_PAYMENT', (id, data) => ({
    request: {
        method: 'put',
        path: `payments/${id}`,
        body: data
    }
}));

export const resolvePayment = createAction('RESOLVE_PAYMENT', id => ({
    request: {
        method: 'patch',
        path: `payments/${id}`
    }
}));

export const deletePayment = createAction('DELETE_PAYMENT', id => ({
    request: {
        method: 'delete',
        path: `payments/${id}`
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