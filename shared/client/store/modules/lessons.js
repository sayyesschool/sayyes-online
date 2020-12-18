import { createAction, createReducer, combineReducers } from 'shared/store/utils';

export const getLessons = createAction('GET_LESSONS', query => {
    return {
        request: {
            method: 'get',
            url: '/lessons',
            query
        }
    };
});

export const getLesson = createAction('GET_LESSON', lessonId => ({
    request: {
        method: 'get',
        url: `/lessons/${lessonId}`
    }
}));

export const unsetLesson = createAction('UNSET_LESSON');

export const createLesson = createAction('CREATE_LESSON', data => ({
    request: {
        method: 'post',
        url: '/lessons',
        body: data
    }
}));

export const updateLesson = createAction('UPDATE_LESSON', (lessonId, data) => ({
    request: {
        method: 'put',
        url: `/lessons/${lessonId}`,
        body: data
    }
}));

export const deleteLesson = createAction('DELETE_LESSON', lessonId => ({
    request: {
        method: 'delete',
        url: `/lessons/${lessonId}`
    }
}));

export const actions = {
    getLessons,
    getLesson,
    unsetLesson,
    createLesson,
    updateLesson,
    deleteLesson
};

export const lessonsReducer = createReducer(null, {
    [getLessons]: (state, action) => action.data,
    [createLesson]: (state, action) => state ? [...state, action.data] : [action.data],
    [updateLesson]: (state, action) => state.map(lesson => lesson.id === action.data.lesson.id ? ({ ...lesson, ...action.data.lesson }) : lesson),
    [deleteLesson]: (state, action) => state.filter(lesson => lesson.id !== action.data.lessonId)
});

export const lessonReducer = createReducer(null, {
    [updateLesson]: (state, action) => ({ ...state, ...action.data }),
    [deleteLesson]: (state, action) => null
});

export default combineReducers({
    list: lessonsReducer,
    single: lessonReducer
});