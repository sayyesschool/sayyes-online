import { useEffect } from 'react';

import { useActions, useStore } from 'shared/hooks/store';
import { actions as exerciseActions } from 'shared/store/modules/exercises';

export function useExercise(id) {
    const [exercise, actions] = useStore(
        state => state.exercises.map?.[id],
        exerciseActions
    );

    const exerciseId = exercise?.id;

    useEffect(() => {
        if (!id || id === exerciseId) return;

        actions.unsetExercise(exerciseId);
        actions.getExercise(id);
    }, [id, exerciseId, actions]);

    return [exercise, actions];
}

export function useExerciseActions() {
    return useActions(exerciseActions);
}