import { createAction, createReducer, combineReducers } from 'shared/store/utils';

import { createLesson } from './lessons';

export const getEnrollments = createAction('GET_ENROLLMENTS', () => ({
    request: {
        method: 'get',
        url: '/enrollments'
    }
}));

export const getEnrollment = createAction('GET_ENROLLMENT', id => ({
    request: {
        method: 'get',
        url: `/enrollments/${id}`
    }
}));

export const createEnrollment = createAction('CREATE_ENROLLMENT', data => ({
    request: {
        method: 'post',
        url: '/enrollments',
        body: data
    }
}));

export const updateEnrollment = createAction('UPDATE_ENROLLMENT', (id, data) => ({
    request: {
        method: 'put',
        url: `/enrollments/${id}`,
        body: data
    }
}));

export const deleteEnrollment = createAction('DELETE_ENROLLMENT', id => ({
    request: {
        method: 'delete',
        url: `/enrollments/${id}`
    }
}));

export default combineReducers({
    list: createReducer(null, {
        [getEnrollments]: (state, action) => action.data,
        [createEnrollment]: (state, action) => state ? [...state, action.data] : [action.data],
        [updateEnrollment]: (state, action) => state && state.map(r => r.id !== action.data.id ? r : { ...r, ...action.data }),
        [deleteEnrollment]: (state, action) => state && state?.filter(r => r.id !== action.data.id)
    }),

    single: createReducer(null, {
        [getEnrollment]: (state, action) => action.data,
        [updateEnrollment]: (state, action) => ({ ...state, ...action.data }),
        [createLesson]: (state, action) => action.data.enrollment == state.id ?
            { ...state, lessons: state.lessons.concat(action.data) } :
            state,
        [deleteEnrollment]: (state, action) => null
    })
});