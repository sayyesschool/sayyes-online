import { combineReducers, createAction, createReducer } from 'shared/store/helpers';

import { getAssignment } from './assignments';
import { getCourse } from './courses';

const normalizeExercise = rawExercise => {
    const { progress, ...exercise } = rawExercise;

    return {
        ...exercise,
        progressId: progress?.id,
        state: progress?.state ?? {},
        status: progress?.status ?? 0,
        isCompleted: !!progress?.isCompleted,
        isChecked: !!progress?.isChecked
    };
};

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
        const { id, exerciseId, status, isCompleted, isChecked, state: progressState } = action.data;

        if (!state[exerciseId]) return state;

        return {
            ...state,
            [exerciseId]: {
                ...state[exerciseId],
                progressId: id,
                state: progressState,
                status,
                isCompleted,
                isChecked
            }
        };
    }
});

export default combineReducers({
    map: exerciseReducer
});