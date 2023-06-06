import { createAction, createReducer, combineReducers } from 'shared/store/helpers';

export const getLessons = createAction('GET_LESSONS', query => {
    return {
        request: {
            method: 'get',
            path: 'lessons',
            query
        }
    };
});

export const getTodaysLessons = createAction('GET_LESSONS', () => {
    return {
        request: {
            method: 'get',
            path: 'lessons/today'
        }
    };
});

export const getLesson = createAction('GET_LESSON', lessonId => ({
    request: {
        method: 'get',
        path: `lessons/${lessonId}`
    }
}));

export const setLesson = createAction('SET_LESSON', lesson => ({
    lesson
}));

export const unsetLesson = createAction('UNSET_LESSON');

export const createLesson = createAction('CREATE_LESSON', data => ({
    request: {
        method: 'post',
        path: 'lessons',
        body: data
    }
}));

export const createLessons = createAction('CREATE_LESSONS', data => ({
    request: {
        method: 'post',
        path: 'lessons',
        body: data
    }
}));

export const updateLesson = createAction('UPDATE_LESSON', (lessonId, data) => ({
    request: {
        method: 'put',
        path: `lessons/${lessonId}`,
        body: data
    }
}));

export const deleteLesson = createAction('DELETE_LESSON', lessonId => ({
    request: {
        method: 'delete',
        path: `lessons/${lessonId}`
    }
}));

export const actions = {
    getLessons,
    getTodaysLessons,
    getLesson,
    unsetLesson,
    createLesson,
    createLessons,
    updateLesson,
    deleteLesson
};

export const lessonsReducer = createReducer(null, {
    [getLessons]: (state, action) => action.data,
    [createLesson]: (state, action) => state ? [...state, action.data] : [action.data],
    // [createLessons]: (state, action) => state ? [...state, ...action.data] : action.data,
    [updateLesson]: (state, action) => state?.map(lesson => lesson.id === action.data.id ? ({ ...lesson, ...action.data }) : lesson),
    [deleteLesson]: (state, action) => state?.filter(lesson => lesson.id !== action.data.id)
});

export const lessonReducer = createReducer(null, {
    [updateLesson]: (state, action) => ({ ...state, ...action.data }),
    [deleteLesson]: (state, action) => null
});

export default combineReducers({
    list: lessonsReducer,
    single: lessonReducer
});