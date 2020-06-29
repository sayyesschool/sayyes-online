import { createAction, createReducer, combineReducers } from 'shared/store/utils';

export const getTeachers = createAction('GET_TEACHERS', query => ({
    request: {
        method: 'get',
        url: '/teachers' + (query ? ('?' + query) : '')
    }
}));

export const getTeacher = createAction('GET_TEACHER', id => ({
    request: {
        method: 'get',
        url: `/teachers/${id}`
    }
}));

export const createTeacher = createAction('CREATE_TEACHER', data => ({
    request: {
        method: 'post',
        url: '/teachers',
        body: data
    }
}));

export const updateTeacher = createAction('UPDATE_TEACHER', (id, data) => ({
    request: {
        method: 'put',
        url: `/teachers/${id}`,
        body: data
    }
}));

export const deleteTeacher = createAction('DELETE_TEACHER', (id, data) => ({
    request: {
        method: 'put',
        url: `/teachers/${id}`,
        body: data
    }
}));

export default combineReducers({
    list: createReducer(null, {
        [getTeachers]: (state, action) => action.data,
        [createTeacher]: (state, action) => [...state, action.data]
    }),

    single: createReducer(null, {
        [getTeacher]: (state, action) => action.data,
        [updateTeacher]: (state, action) => action.data,
        [deleteTeacher]: (state, action) => null
    })
});