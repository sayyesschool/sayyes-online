import { useEffect, useMemo } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as courseActions, mapCourse } from 'shared/store/modules/courses';

export function useCourses(query) {
    const [courses, actions] = useStore(state => (state.courses && 'list' in state.courses) ? state.courses.list : state.courses, courseActions);

    useEffect(() => {
        if (!courses) {
            actions.getCourses(query);
        }
    }, []);

    return [courses, actions];
}

export function useCourse(id) {
    const [course, actions] = useStore(state => (state.courses && 'single' in state.courses) ? state.courses.single : state.course, courseActions);

    useEffect(() => {
        if (course?.id === id) return;

        actions.getCourse(id);
        actions.unsetCourse();
    }, [id]);

    return [
        useMemo(() => mapCourse(course), [course]),
        actions
    ];
}