import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as lessonActions } from 'shared/store/modules/lessons';

export function useLessons(query) {
    const [lessons, actions] = useStore(state => state.lessons?.list, lessonActions);

    useEffect(() => {
        if (!lessons) {
            actions.getLessons(query);
        }
    }, []);

    return [lessons, actions];
}

export function useTodaysLessons() {
    const [lessons, actions] = useStore(state => state.lessons?.list, lessonActions);

    useEffect(() => {
        if (!lessons) {
            actions.getTodaysLessons();
        }
    }, []);

    return [lessons, actions];
}

export function useLesson(id) {
    const [lesson, actions] = useStore(state => state.lesson, lessonActions);

    useEffect(() => {
        if (!lesson) {
            actions.getLesson(id);
        }

        return () => actions.unsetLesson();
    }, [id]);

    return [lesson, actions];
}