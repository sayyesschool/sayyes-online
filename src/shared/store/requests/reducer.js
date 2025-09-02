import { combineReducers, createReducer } from 'shared/store/helpers';

import {
    createRequest,
    deleteRequest,
    getNewRequests,
    getRequest,
    getRequests,
    setRequest,
    unsetRequest,
    updateRequest
} from './actions';

export default combineReducers({
    list: createReducer(null, {
        [getRequests]: (state, action) => action.data,
        [getNewRequests]: (state, action) => [...state, ...action.data],
        [createRequest]: (state, action) => state ? [...state, action.data] : [action.data],
        [updateRequest]: (state, action) => state.map(r => r.id !== action.data.id ? r : { ...r, ...action.data }),
        [deleteRequest]: (state, action) => state.filter(r => r.id !== action.data.requestId)
    }),

    single: createReducer(null, {
        [getRequest]: (state, action) => action.data,
        [setRequest]: (state, action) => action.data,
        [unsetRequest]: (state, action) => null,
        [updateRequest]: (state, action) => ({ ...state, ...action.data }),
        [deleteRequest]: (state, action) => null
    })
});