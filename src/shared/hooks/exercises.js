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

    useEffect(() => {
        if (!id) return;

        if (!exercise) {
            actions.getExercise(id);
        }

        return () => actions.unsetExercise();
    }, [id, exercise, actions]);

    return [exercise, actions];
}

export function useExerciseActions() {
    return useActions(exerciseActions);
}