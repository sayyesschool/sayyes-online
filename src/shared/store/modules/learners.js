import { createAction, createReducer, combineReducers } from 'shared/store/helpers';

import { createPayment, updatePayment, deletePayment } from './payments';

export const getLearners = createAction('GET_LEARNERS', query => ({
    request: {
        method: 'get',
        path: 'learners',
        query
    }
}));

export const getLearner = createAction('GET_LEARNER', learnerId => ({
    request: {
        method: 'get',
        path: `learners/${learnerId}`
    }
}));

export const createLearner = createAction('CREATE_LEARNER', data => ({
    request: {
        method: 'post',
        path: 'learners',
        body: data
    }
}));

export const updateLearner = createAction('UPDATE_LEARNER', (learnerId, data) => ({
    request: {
        method: 'put',
        path: `learners/${learnerId}`,
        body: data
    }
}));

export const deleteLearner = createAction('DELETE_LEARNER', (learnerId, data) => ({
    request: {
        method: 'delete',
        path: `learners/${learnerId}`,
        body: data
    }
}));

export default combineReducers({
    list: createReducer(null, {
        [getLearners]: (state, action) => action.data,
        [createLearner]: (state, action) => state ? [...state, action.data] : [action.data],
        [deleteLearner]: (state, action) => state ? state.filter(learner => learner.id !== action.data.id) : state
    }),

    single: createReducer(null, {
        [getLearner]: (state, action) => action.data,
        [updateLearner]: (state, action) => ({ ...state, ...action.data }),
        [deleteLearner]: (state, action) => null,

        [createPayment]: (state, action) => state?.id === action.data.learner ? {
            ...state,
            payments: state.payments.concat(action.data)
        } : state,
        [updatePayment]: (state, action) => state?.id === action.data.learner ? {
            ...state,
            payments: state.payments.map(p => p.id === action.data.id ? {
                ...p,
                ...action.data
            } : p)
        } : state,
        [deletePayment]: (state, action) => state?.id === action.data.learner ? {
            ...state,
            payments: state.payments.filter(p => p.id !== action.data.id)
        } : state
    })
});