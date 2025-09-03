import { combineReducers, createAction, createReducer } from 'shared/store/helpers';

import { getAssignment } from './assignments';
import { getCourse } from './courses';

const normalizeExercise = exercise => ({
    ...exercise,
    completed: exercise.progress?.completed,
    checked: exercise.progress?.checked
});

const exercisesToMap = (exercises = []) => {
    return exercises.reduce((map, exercise) => {
        map[exercise.id] = normalizeExercise(exercise);

        return map;
    }, {});
};

// Exercise
export const getExercise = createAction('GET_EXERCISE', (id, query) => ({
    request: {
        method: 'get',
        path: `exercises/${id}`,
        query
    }
}));

// Progress
export const updateExerciseProgress = createAction('UPDATE_EXERCISE_PROGRESS', (progressId = '', data) => ({
    request: {
        method: 'put',
        path: `progress/${progressId}`,
        body: data
    }
}));

export const actions = {
    getExercise,
    updateExerciseProgress
};

export const exerciseReducer = createReducer(null, {
    [getExercise]: (state, action) => {
        const exercise = action.data;

        if (!exercise) return state;

        return {
            ...state,
            [exercise.id]: normalizeExercise(exercise)
        };
    },
    // Course
    [getCourse]: (state, action) => exercisesToMap(action.data?.exercises),
    // Assignment
    [getAssignment]: (state, action) => exercisesToMap(action.data?.exercises),
    // Progress
    [updateExerciseProgress]: (state, action) => {
        const { exerciseId, completed, checked } = action.data;

        if (!state[exerciseId]) return state;

        return {
            ...state,
            [exerciseId]: {
                ...state[exerciseId],
                completed: completed,
                checked: checked,
                progress: action.data
            }
        };
    }
});

export default combineReducers({
    map: exerciseReducer
});