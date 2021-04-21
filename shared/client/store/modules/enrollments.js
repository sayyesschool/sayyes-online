import { createAction, createReducer, combineReducers } from 'shared/store';
import { createLesson, createLessons, deleteLesson } from './lessons';
import { createPost } from './posts';
import { createComment, updateComment, deleteComment } from './comments';

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

export const actions = {
    getEnrollments,
    getEnrollment,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment
};

export const enrollmentsReducer = createReducer(null, {
    [getEnrollments]: (state, action) => action.data,
    [createEnrollment]: (state, action) => state?.concat(action.data) || [action.data],
    //[updateEnrollment]: (state, action) => state?.map(e => e.id !== action.data.id ? e : { ...e, ...action.data }),
    //[deleteEnrollment]: (state, action) => state?.filter(e => e.id !== action.data.id)
});

export const enrollmentReducer = createReducer(null, {
    [getEnrollment]: (state, action) => action.data,
    [updateEnrollment]: (state, action) => ({ ...state, ...action.data }),
    [deleteEnrollment]: (state, action) => null,

    [createLesson]: (state, action) => state.id === action.data.enrollment ?
        { ...state, lessons: state.lessons.concat(action.data) } :
        state,
    // [createLessons]: (state, action) => action.data.map(lesson => ) ?
    //     { ...state, lessons: state.lessons.concat(...action.data) } :
    //     state,
    [deleteLesson]: (state, action) => state.id === action.data.enrollment ?
        { ...state, lessons: state.lessons.filter(lesson => lesson.id !== action.data.id) } :
        state,
    // [createPost]: (state, action) => state.id === action.data.enrollment ?
    //     { ...state, lessons: state.posts.concat(action.data) } :
    //     state

    [createComment]: (state, action) => state.id !== action.data.ref ? state : {
        ...state,
        comments: state.comments.concat(action.data)
    },
    [updateComment]: (state, action) => state.id !== action.data.ref ? state : {
        ...state,
        comments: state.comments.map(comment => comment.id !== action.data.id ? comment : {
            ...comment,
            ...action.data
        })
    },
    [deleteComment]: (state, action) => state.id !== action.data.ref ? state : {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.data.id)
    }
});

export default combineReducers({
    list: enrollmentsReducer,
    single: enrollmentReducer
});