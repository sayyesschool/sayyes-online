import { useEffect } from 'react';

import { useActions, useStore } from 'shared/hooks/store';
import { actions as exerciseActions } from 'shared/store/modules/exercises';
import { hasKey } from 'shared/utils/object';

export function useExercise({ id, query = {} }) {
    const [exercises, actions] = useStore(
        state => state && hasKey(state.exercises, 'map') ?
            state.exercises.map :
            state.exercises,
        exerciseActions
    );
    const exercise = id && exercises ? exercises[id] : null;

    useEffect(() => {
        if (!id) return;

        if (!exercise || exercise.partiallyLoaded) {
            actions.getExercise(id, query);
        }
    }, [id, exercise, actions, query]);

    return [exercise, actions];
}

export function useExercises() {
    const [exercises, actions] = useStore(
        state => state && hasKey(state.exercises, 'map') ?
            state.exercises.map :
            state.exercises,
        exerciseActions
    );

    if (!exercises) return [[], actions];

    return [Object.values(exercises), actions];
}

export function useExerciseActions() {
    return useActions(exerciseActions);
}