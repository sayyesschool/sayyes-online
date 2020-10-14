import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as courseActions } from 'app/store/modules/course';

export function useCourse(id) {
    const [course, actions] = useStore(state => state.course, courseActions);

    useEffect(() => {
        if (!course) {
            actions.getCourse(id);
        }
    }, [id]);

    return [course, actions];
}