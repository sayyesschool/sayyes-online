import { combineReducers, createAction, createReducer } from 'shared/store/helpers';
import { createComment, deleteComment, updateComment } from 'shared/store/modules/comments';

export const getExercises = createAction('GET_EXERCISES', query => ({
    request: {
        method: 'get',
        path: 'exercises',
        query
    }
}));

export const getExercise = createAction('GET_EXERCISE', id => ({
    request: {
        method: 'get',
        path: `exercises/${id}`
    }
}));

export const createExercise = createAction('CREATE_EXERCISE', data => ({
    request: {
        method: 'post',
        path: 'exercises',
        body: data
    }
}));

export const updateExercise = createAction('UPDATE_EXERCISE', (id, data) => ({
    request: {
        method: 'put',
        path: `exercises/${id}`,
        body: data
    }
}));

export const deleteExercise = createAction('DELETE_EXERCISE', id => ({
    request: {
        method: 'delete',
        path: `exercises/${id}`
    }
}));

export const unsetExercise = createAction('UNSET_EXERCISE');

// Items

export const createExerciseItem = createAction('CREATE_EXERCISE_ITEM', (exerciseId, data) => ({
    request: {
        method: 'post',
        path: `exercises/${exerciseId}/items`,
        body: data
    }
}));

export const updateExerciseItem = createAction('UPDATE_EXERCISE_ITEM', (exerciseId, itemId, data) => ({
    request: {
        method: 'put',
        path: `exercises/${exerciseId}/items/${itemId}`,
        body: data
    }
}));

export const deleteExerciseItem = createAction('DELETE_EXERCISE_ITEM', (exerciseId, itemId, body) => ({
    request: {
        method: 'delete',
        path: `exercises/${exerciseId}/items/${itemId}`,
        body
    }
}));

// Progress

export const updateExerciseProgress = createAction('UPDATE_EXERCISE_PROGRESS', (progressId = '', data) => ({
    request: {
        method: 'post',
        path: `progress/${progressId}`,
        body: data
    }
}));

export const actions = {
    getExercises,
    getExercise,
    createExercise,
    updateExercise,
    deleteExercise,
    unsetExercise,

    createExerciseItem,
    updateExerciseItem,
    deleteExerciseItem,

    updateExerciseProgress
};

export const exercisesReducer = createReducer(null, {
    [getExercises]: (state, action) => action.data,

    [createExercise]: (state, action) => state && state.concat(action.data) || [action.data],

    [updateExercise]: (state, action) => state && state.map(exercise =>
        exercise.id !== action.data.id ? exercise : {
            ...exercise,
            ...action.data
        }
    ),

    [deleteExercise]: (state, action) => state && state.filter(exercise => exercise.id !== action.data.id)
});

export const exerciseReducer = createReducer(null, {
    [getExercise]: (state, action) => action.data,

    [updateExercise]: (state, action) => ({ ...state, ...action.data }),

    [deleteExercise]: () => null,

    [unsetExercise]: () => null,

    [createComment]: (state, action) => ({
        ...state,
        comments: state.comments.concat(action.data)
    }),

    [updateComment]: (state, action) => ({
        ...state,
        comments: state.comments.map(comment => comment.id !== action.data.id ?
            comment :
            action.data
        )
    }),

    [deleteComment]: (state, action) => ({
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.data.id)
    })
});

export default combineReducers({
    list: exercisesReducer,
    single: exerciseReducer
});