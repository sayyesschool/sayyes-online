import { useEffect, useMemo } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as courseActions, mapCourse } from 'shared/store/modules/courses';

const EMPTY = Object.freeze({});

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
        if (course?.id === id || course?.slug === id) return;

        actions.unsetCourse();
        actions.getCourse(id);
    }, [id]);

    return [
        useMemo(() => mapCourse(course), [course]),
        actions
    ];
}

export function use({ courseId, unitId, lessonId, exerciseId }) {
    const [course, actions] = useCourse(courseId);

    return useMemo(() => !course ? EMPTY : ({
        course,
        unit: unitId && course.unitsById?.get(unitId),
        lesson: lessonId && course.lessonsById?.get(lessonId),
        exercise: exerciseId && course.exercisesById?.get(exerciseId),
        actions
    }), [course, unitId, lessonId, exerciseId]);
}