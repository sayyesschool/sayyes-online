import { createAction, createReducer, combineReducers } from 'shared/store';

// Courses

export const getCourses = createAction('GET_COURSES', query => {
    return {
        request: {
            method: 'get',
            url: '/courses',
            query
        }
    };
});

export const getCourse = createAction('GET_COURSE', courseId => ({
    request: {
        method: 'get',
        url: `/courses/${courseId}`
    }
}));

export const createCourse = createAction('CREATE_COURSE', data => ({
    request: {
        method: 'post',
        url: '/courses',
        body: data
    }
}));

export const updateCourse = createAction('UPDATE_COURSE', (courseId, data) => ({
    request: {
        method: 'put',
        url: `/courses/${courseId}`,
        body: data
    }
}));

export const deleteCourse = createAction('DELETE_COURSE', courseId => ({
    request: {
        method: 'delete',
        url: `/courses/${courseId}`
    }
}));

// Units

export const createUnit = createAction('CREATE_COURSE_UNIT', (courseId, data) => ({
    request: {
        method: 'post',
        url: `/courses/${courseId}/units`,
        body: data
    }
}));

export const updateUnit = createAction('UPDATE_COURSE_UNIT', (courseId, unitId, data) => ({
    request: {
        method: 'put',
        url: `/courses/${courseId}/units/${unitId}`,
        body: data
    }
}));

export const deleteUnit = createAction('DELETE_COURSE_UNIT', (courseId, unitId) => ({
    request: {
        method: 'delete',
        url: `/courses/${courseId}/units/${unitId}`
    }
}));

// Lessons

export const createLesson = createAction('CREATE_COURSE_LESSON', (courseId, data) => ({
    request: {
        method: 'post',
        url: `/courses/${courseId}/lessons`,
        body: data
    }
}));

export const updateLesson = createAction('UPDATE_COURSE_LESSON', (courseId, lessonId, data) => ({
    request: {
        method: 'put',
        url: `/courses/${courseId}/lessons/${lessonId}`,
        body: data
    }
}));

export const deleteLesson = createAction('DELETE_COURSE_LESSON', (courseId, lessonId) => ({
    request: {
        method: 'delete',
        url: `/courses/${courseId}/lessons/${lessonId}`,
    }
}));

// Exercises

export const createExercise = createAction('CREATE_COURSE_EXERCISE', (courseId, data) => ({
    request: {
        method: 'post',
        url: `/courses/${courseId}/exercises`,
        body: data
    }
}));

export const updateExercise = createAction('UPDATE_COURSE_EXERCISE', (courseId, exerciseId, data) => ({
    request: {
        method: 'put',
        url: `/courses/${courseId}/exercises/${exerciseId}`,
        body: data
    }
}));

export const deleteExercise = createAction('DELETE_COURSE_EXERCISE', (courseId, exerciseId) => ({
    request: {
        method: 'delete',
        url: `/courses/${courseId}/exercises/${exerciseId}`
    }
}));

export const actions = {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,

    createUnit,
    updateUnit,
    deleteUnit,

    createLesson,
    updateLesson,
    deleteLesson,

    createExercise,
    updateExercise,
    deleteExercise
};

export const coursesReducer = createReducer(null, {
    [getCourses]: (state, action) => action.data,
    [createCourse]: (state, action) => state ? [...state, action.data] : [action.data],
    [updateCourse]: (state, action) => state.map(course => course.id === action.data.course.id ? ({ ...course, ...action.data.course }) : course),
    [deleteCourse]: (state, action) => state.filter(course => course.id !== action.data.courseId)
});

export const courseReducer = createReducer(null, {
    // Course

    [getCourse]: (state, action) => mapCourse(action.data),
    [updateCourse]: (state, action) => ({ ...state, ...action.data }),
    [deleteCourse]: (state, action) => null,

    // Unit

    [createUnit]: (state, action) => mapCourse({
        ...state,
        units: state.units.concat(action.data)
    }),

    [updateUnit]: (state, action) => mapCourse({
        ...state,
        units: state.units.map(unit => unit.id !== action.data.id ? unit : {
            ...unit,
            ...action.data
        })
    }, action.data),

    [deleteUnit]: (state, action) => mapCourse({
        ...state,
        units: state.units.filter(unit => unit.id !== action.data.id),
        lessons: state.lessons.filter(lesson => lesson._unit !== action.data.id),
        exercises: state.exercises.filter(exercise => exercise._unit !== action.data.id)
    }),

    // Lesson

    [createLesson]: (state, action) => mapCourse({
        ...state,
        lessons: state.lessons.concat(action.data),
        units: state.units.map(unit => unit.id !== action.data._unit ? unit : {
            ...unit,
            _lessons: unit._lessons.concat(action.data.id)
        })
    }),

    [updateLesson]: (state, action) => mapCourse({
        ...state,
        lessons: state.lessons.map(lesson => lesson.id !== action.data.id ? lesson : {
            ...lesson,
            ...action.data
        })
    }),

    [deleteLesson]: (state, action) => mapCourse({
        ...state,
        lessons: state.lessons.filter(lesson => lesson.id !== action.data.id),
        units: state.units.map(unit => unit.id !== action.data._unit ? unit : {
            ...unit,
            _lessons: unit._lessons.filter(id => id !== action.data.id)
        }),
        exercises: state.exercises.filter(exercise => exercise._lesson !== action.data.id)
    }),

    // Exercise

    [createExercise]: (state, action) => mapCourse({
        ...state,
        exercises: state.exercises.concat(action.data),
        lessons: state.lessons.map(lesson => lesson.id !== action.data._lesson ? lesson : {
            ...lesson,
            _exercises: lesson._exercises.concat(action.data.id)
        })
    }),

    [updateExercise]: (state, action) => mapCourse({
        ...state,
        exercises: state.exercises.map(lesson => lesson.id !== action.data.id ? lesson : {
            ...lesson,
            ...action.data
        })
    }),

    [deleteExercise]: (state, action) => mapCourse({
        ...state,
        exercises: state.exercises.filter(exercise => exercise.id !== action.data.id),
        lessons: state.lessons.map(lesson => lesson.id !== action.data._lesson ? lesson : {
            ...lesson,
            _exercises: lesson._exercises.filter(id => id !== action.data.id)
        })
    })
});

export default combineReducers({
    list: coursesReducer,
    single: courseReducer
});

function mapCourse(course) {
    course.unitsById = course.units.reduce((map, unit) => map.set(unit.id, unit), new Map());
    course.lessonsById = course.lessons.reduce((map, lesson) => map.set(lesson.id, lesson), new Map());
    course.exercisesById = course.exercises.reduce((map, exercise) => map.set(exercise.id, exercise), new Map());
    course.audiosByFilename = course.audios.reduce((map, audio) => map.set(audio.filename, audio), new Map());
    course.videosByFilename = course.videos.reduce((map, video) => map.set(video.filename, video), new Map());

    course.units.forEach(unit => {
        unit.audios = unit.audios.map(title => course.audiosByFilename.get(title));
        unit.videos = unit.videos.map(title => course.videosByFilename.get(title));
        unit.lessons = unit.lessons.map(id => {
            const lesson = course.lessonsById.get(id);

            lesson.unitId = unit.id;
            lesson.exercises = lesson.exercises.map((id, index) => {
                const exercise = course.exercisesById.get(id);

                exercise.lessonId = lesson.id;
                exercise.number = index + 1;

                return exercise;
            });

            return lesson;
        });
    });

    return course;
}