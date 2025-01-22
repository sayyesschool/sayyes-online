import { combineReducers, createAction, createReducer } from 'shared/store/helpers';

import { createPayment, deletePayment, updatePayment } from './payments';

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

export const unsetLearner = createAction('UNSET_LEARNER');

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
        [unsetLearner]: () => null,

        [createPayment]: (state, action) => state && state?.id === action.data.userId && {
            ...state,
            payments: state && state.payments.concat(action.data)
        },
        [updatePayment]: (state, action) => state && state?.id === action.data.userId && {
            ...state,
            payments: state && state.payments.map(p => p.id === action.data.id ? {
                ...p,
                ...action.data
            } : p)
        },
        [deletePayment]: (state, action) => state && state.id === action.data.userId && {
            ...state,
            payments: state && state.payments.filter(p => p.id !== action.data.id)
        }
    })
});