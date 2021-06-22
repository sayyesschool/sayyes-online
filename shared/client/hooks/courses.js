import { useEffect, useMemo } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as courseActions } from 'shared/store/modules/courses';

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
        actions.getCourse(id);
        actions.unsetCourse();
    }, [id]);

    return [
        useMemo(() => mapCourse(course), [course]),
        actions
    ];
}

function mapCourse(course) {
    if (!course) return;

    course.unitsById = course.units.reduce((map, unit) => map.set(unit.id, unit), new Map());
    course.lessonsById = course.lessons.reduce((map, lesson) => map.set(lesson.id, lesson), new Map());
    course.exercisesById = course.exercises.reduce((map, exercise) => map.set(exercise.id, exercise), new Map());
    course.audiosByFilename = course.audios.reduce((map, audio) => map.set(audio.filename, audio), new Map());
    course.videosByFilename = course.videos.reduce((map, video) => map.set(video.filename, video), new Map());
    // const lessons = course.lessons.map(lesson => {
    //     const audios = lesson.audios.map(title => audiosByFilename.get(title));
    //     const videos = lesson.videos.map(title => videosByFilename.get(title));
    //     const exercises = lesson.exercises.map((id, index) => {
    //         const exercise = exercisesById.get(id);

    //         exercise.lessonId = lesson.id;
    //         exercise.number = index + 1;

    //         return exercise;
    //     });

    //     return { ...lesson, audios, videos, exercises };
    // });

    return course;
}