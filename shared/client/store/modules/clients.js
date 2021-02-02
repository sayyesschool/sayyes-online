import { createAction, createReducer, combineReducers } from 'shared/store';

import { createPayment } from './payments';

export const getClients = createAction('GET_CLIENTS', query => {
    return {
        request: {
            method: 'get',
            url: '/clients',
            query
        }
    };
});

export const getClient = createAction('GET_CLIENT', clientId => ({
    request: {
        method: 'get',
        url: `/clients/${clientId}`
    }
}));

export const createClient = createAction('CREATE_CLIENT', data => ({
    request: {
        method: 'post',
        url: '/clients',
        body: data
    }
}));

export const updateClient = createAction('UPDATE_CLIENT', (clientId, data) => ({
    request: {
        method: 'put',
        url: `/clients/${clientId}`,
        body: data
    }
}));

export const deleteClient = createAction('DELETE_CLIENT', (clientId, data) => ({
    request: {
        method: 'delete',
        url: `/clients/${clientId}`,
        body: data
    }
}));

export default combineReducers({
    list: createReducer(null, {
        [getClients]: (state, action) => action.data,
        [createClient]: (state, action) => state ? [...state, action.data] : [action.data]
    }),

    single: createReducer(null, {
        [getClient]: (state, action) => action.data,
        [updateClient]: (state, action) => action.data,
        [deleteClient]: (state, action) => null,
        [createPayment]: (state, action) => action.data.client === state.id ? {
            ...state,
            payments: state.payments.concat(action.data)
        } : state
    })
});