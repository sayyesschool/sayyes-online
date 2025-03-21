import datetime from 'shared/libs/datetime';
import { combineReducers, createAction, createReducer } from 'shared/store/helpers';

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
    [getLessons]: (state, action) => action.data.map(mapLesson),
    [createLesson]: (state, action) => state ? [...state, action.data] : [action.data],
    // [createLessons]: (state, action) => state ? [...state, ...action.data] : action.data,
    [updateLesson]: (state, action) => state && state.map(lesson => lesson.id === action.data.id ? ({ ...lesson, ...action.data }) : lesson),
    [deleteLesson]: (state, action) => state && state.filter(lesson => lesson.id !== action.data.id)
});

export const lessonReducer = createReducer(null, {
    [updateLesson]: (state, action) => ({ ...state, ...action.data }),
    [deleteLesson]: (state, action) => null
});

export default combineReducers({
    list: lessonsReducer,
    single: lessonReducer
});

function mapLesson(lesson) {
    const dateTime = datetime(lesson.date);
    const dateTimeAbs = dateTime.utc().add(3, 'hours'); // Moscow Time

    return {
        ...lesson,
        dateString: dateTime.format('DD.MM.YYYY'),
        timeString: dateTime.format('HH:mm'),
        dateStringAbs: dateTimeAbs.format('DD.MM.YYYY'),
        timeStringAbs: dateTimeAbs.format('HH:mm')
    };
}