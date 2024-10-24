import { useEffect } from 'react';

import { useActions, useStore } from 'shared/hooks/store';
import { actions as exerciseActions } from 'shared/store/modules/exercises';
import { hasKey } from 'shared/utils/object';

export function useExercise(id) {
    const [exercise, actions] = useStore(
        state => state && hasKey(state.exercises, 'single') ?
            state.exercises.single :
            state.exercise,
        exerciseActions
    );

    const exerciseId = exercise?.id;

    useEffect(() => {
        if (id === exerciseId) return;

        actions.unsetExercise();
        actions.getExercise(id);
    }, [exerciseId, id, actions]);

    return [exercise, actions];
}

export function useExerciseActions() {
    return useActions(exerciseActions);
}