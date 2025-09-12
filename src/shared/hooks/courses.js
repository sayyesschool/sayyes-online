import { useEffect, useMemo } from 'react';

import { useExercises } from 'shared/hooks/exercises';
import { useStore } from 'shared/hooks/store';
import { actions as courseActions, mapCourse } from 'shared/store/modules/courses';
import { emptyObject, hasKey } from 'shared/utils/object';

export function useCourses(query) {
    const [courses, actions] = useStore(
        state => state && hasKey(state.courses, 'list') ?
            state.courses.list :
            state.courses,
        courseActions
    );

    useEffect(() => {
        if (!courses) {
            actions.getCourses(query);
        }
    }, []);

    return [courses, actions];
}

export function useCourse(courseId, query) {
    const [course, actions] = useStore(
        state => state && hasKey(state.courses, 'single') ?
            state.courses.single :
            state.course,
        courseActions
    );

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

    return useMemo(() => !course ? emptyObject : ({
        course,
        unit,
        actions
    }), [course, unitId]);
}

export function useUnitProgress(unit) {
    const [exercises] = useExercises();

    const unitExercises = unit.lessons.flatMap(
        lesson => lesson.sections.flatMap(
            section => section.exercises
        )
    )?.map(({ id } = {}) => exercises?.[id]);

    if (!unitExercises || unitExercises.some(ex => !ex.progressId)) return undefined;

    const exercisesLength = unitExercises.length;
    const checkedExercises = unitExercises.filter(exercise => exercise.isChecked);
    const progress = exercisesLength ? (checkedExercises.length / exercisesLength) * 100 : 0;

    return Math.round(progress);
}

export function useLessonProgress(lesson) {
    const [exercises] = useExercises();

    const unitExercises = lesson.sections.flatMap(
        section => section.exercises
    ).map(({ id } = {}) => exercises?.[id]);

    if (!unitExercises || unitExercises.some(ex => !ex.progressId)) return undefined;

    // TODO: перенести дублирование из useUnitProgress в хелпер
    const exercisesLength = unitExercises.length;
    const checkedExercises = unitExercises.filter(exercise => exercise.isChecked);
    const progress = exercisesLength ? (checkedExercises.length / exercisesLength) * 100 : 0;

    return Math.round(progress);
}

export function useLesson({ courseId, lessonId }) {
    const [course, actions] = useCourse(courseId);
    const lesson = course?.lessonsById?.get(lessonId);

    return useMemo(() => !course ? emptyObject : ({
        course,
        lesson,
        unit: course.unitsById?.get(lesson.unitId),
        actions
    }), [course, lessonId]);
}

export function useSection({ courseId, sectionId }) {
    const [course, actions] = useCourse(courseId);
    const section = course?.sectionsById?.get(sectionId);

    return useMemo(() => !course ? emptyObject : ({
        course,
        section,
        lesson: course.lessonsById?.get(section.lessonId),
        unit: course.unitsById?.get(section.unitId),
        actions
    }), [course, sectionId]);
}

export function useExercise({ courseId, exerciseId }) {
    const [course, actions] = useCourse(courseId);
    const exercise = course?.exercisesById?.get(exerciseId);

    return useMemo(() => !course ? emptyObject : ({
        course,
        exercise,
        lesson: course.lessonsById?.get(exercise.lessonId),
        unit: course.unitsById?.get(exercise.unitId),
        actions
    }), [course, exerciseId]);
}

export function useAll({ courseId, unitId, lessonId, exerciseId }) {
    const [course, actions] = useCourse(courseId);

    return useMemo(() => !course ? emptyObject : ({
        course,
        unit: unitId && course.unitsById?.get(unitId),
        lesson: lessonId && course.lessonsById?.get(lessonId),
        exercise: exerciseId && course.exercisesById?.get(exerciseId),
        actions
    }), [course, unitId, lessonId, exerciseId]);
}