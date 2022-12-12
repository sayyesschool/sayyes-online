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

export function useCourse(courseId, query) {
    const [course, actions] = useStore(state => (state.courses && 'single' in state.courses) ? state.courses.single : state.course, courseActions);

    useEffect(() => {
        if (course?.id === courseId || course?.slug === courseId) return;

        actions.unsetCourse();
        actions.getCourse(courseId, query);
    }, [courseId, query]);

    return [
        useMemo(() => mapCourse(course), [course]),
        actions
    ];
}

export function useUnit({ courseId, unitId }) {
    const [course, actions] = useCourse(courseId);
    const unit = course?.unitsById?.get(unitId);

    return useMemo(() => !course ? EMPTY : ({
        course,
        unit,
        actions
    }), [course, unitId]);
}

export function useLesson({ courseId, lessonId }) {
    const [course, actions] = useCourse(courseId);
    const lesson = course?.lessonsById?.get(lessonId);

    return useMemo(() => !course ? EMPTY : ({
        course,
        lesson,
        unit: course.unitsById?.get(lesson.unitId),
        actions
    }), [course, lessonId]);
}

export function useExercise({ courseId, exerciseId }) {
    const [course, actions] = useCourse(courseId);
    const exercise = course?.exercisesById?.get(exerciseId);

    return useMemo(() => !course ? EMPTY : ({
        course,
        exercise,
        unit: course.unitsById?.get(exercise.unitId),
        lesson: course.lessonsById?.get(exercise.lessonId),
        actions
    }), [course, exerciseId]);
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