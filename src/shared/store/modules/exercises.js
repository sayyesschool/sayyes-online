import { combineReducers, createAction, createReducer } from 'shared/store/helpers';

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

export const unsetExercise = createAction('UNSET_EXERCISE');

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

export const createComment = createAction('CREATE_COMMENT', (id, data) => ({
    request: {
        method: 'post',
        path: `/comments/${id}`,
        body: data
    }
}));

export const updateComment = createAction('UPDATE_COMMENT', (id, data) => ({
    request: {
        method: 'put',
        path: `/comments/${id}`,
        body: data
    }
}));

export const deleteComment = createAction('DELETE_COMMENT', id => ({
    request: {
        method: 'delete',
        path: `comments/${id}`
    }
}));

export const actions = {
    getExercises,
    getExercise,
    unsetExercise,
    createExercise,
    updateExercise,
    deleteExercise,
    createComment,
    updateComment,
    deleteComment
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

    [unsetExercise]: () => null,

    [updateExercise]: (state, action) => ({ ...state, ...action.data }),

    [deleteExercise]: () => null,

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