import { createAction, createReducer, combineReducers } from 'shared/store/utils';

export const getRequests = createAction('GET_REQUESTS', () => ({
    request: {
        method: 'get',
        url: '/requests'
    }
}));

export const createRequest = createAction('CREATE_REQUEST', data => ({
    request: {
        method: 'post',
        url: '/requests',
        body: data
    }
}));

export const updateRequest = createAction('UPDATE_REQUEST', (requestId, data) => ({
    request: {
        method: 'put',
        url: `/requests/${requestId}`,
        body: data
    }
}));

export const deleteRequest = createAction('DELETE_REQUEST', requestId => ({
    request: {
        method: 'delete',
        url: `/requests/${requestId}`
    }
}));

export default combineReducers({
    list: createReducer(null, {
        [getRequests]: (state, action) => action.data,
        [createRequest]: (state, action) => [...state, action.data],
        [deleteRequest]: (state, action) => state.filter(r => r.id !== action.data.requestId)
    }),

    single: createReducer(null, {
        [updateRequest]: (state, action) => action.data,
        [deleteRequest]: (state, action) => null
    })
});