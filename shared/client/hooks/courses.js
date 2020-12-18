import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as courseActions } from 'shared/store/modules/courses';

export function useCourses(query) {
    const [courses, actions] = useStore(state => state.courses, courseActions);

    useEffect(() => {
        if (!materials) {
            actions.getCourses(query);
        }
    }, []);

    return [courses, actions];
}

export function useCourse(id) {
    const [course, actions] = useStore(state => state.course, courseActions);

    useEffect(() => {
        if (!course) {
            actions.getCourse(id);
        }
    }, [id]);

    return [course, actions];
}