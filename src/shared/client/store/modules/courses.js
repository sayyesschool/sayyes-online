import { createAction, createReducer, combineReducers } from 'shared/store/helpers';

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

export const getCourse = createAction('GET_COURSE', (courseId, query) => ({
    request: {
        method: 'get',
        url: `/courses/${courseId}`,
        query
    }
}));

export const unsetCourse = createAction('UNSET_COURSE');

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

export const getExercise = createAction('GET_COURSE_EXERCISE', (courseId, exerciseId) => ({
    request: {
        method: 'get',
        url: `/courses/${courseId}/exercises/${exerciseId}`
    }
}));

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

export const updateExerciseProgress = createAction('UPDATE_COURSE_EXERCISE_PROGRESS', (progressId = '', data) => ({
    request: {
        method: 'post',
        url: `/progress/${progressId}`,
        body: data
    }
}));

// Items

export const createExerciseItem = createAction('CREATE_COURSE_EXERCISE_ITEM', (courseId, exerciseId, data) => ({
    request: {
        method: 'post',
        url: `/courses/${courseId}/exercises/${exerciseId}/items`,
        body: data
    }
}));

export const updateExerciseItem = createAction('UPDATE_COURSE_EXERCISE_ITEM', (courseId, exerciseId, itemId, data) => ({
    request: {
        method: 'put',
        url: `/courses/${courseId}/exercises/${exerciseId}/items/${itemId}`,
        body: data
    }
}));

export const deleteExerciseItem = createAction('DELETE_COURSE_EXERCISE_ITEM', (courseId, exerciseId, itemId, body) => ({
    request: {
        method: 'delete',
        url: `/courses/${courseId}/exercises/${exerciseId}/items/${itemId}`,
        body
    }
}));

// Comments

export const createExerciseComment = createAction('CREATE_EXERCISE_COMMENT', (courseId, exerciseId, data) => ({
    request: {
        method: 'post',
        url: `/courses/${courseId}/exercises/${exerciseId}/comments`,
        body: data
    }
}));

export const updateExerciseComment = createAction('UPDATE_EXERCISE_COMMENT', (courseId, exerciseId, commentId, data) => ({
    request: {
        method: 'put',
        url: `/courses/${courseId}/exercises/${exerciseId}/comments/${commentId}`,
        body: data
    }
}));

export const deleteExerciseComment = createAction('DELETE_EXERCISE_COMMENT', (courseId, exerciseId, commentId, data) => ({
    request: {
        method: 'delete',
        url: `/courses/${courseId}/exercises/${exerciseId}/comments/${commentId}`,
        body: data
    }
}));

export const actions = {
    getCourses,
    getCourse,
    unsetCourse,
    createCourse,
    updateCourse,
    deleteCourse,

    createUnit,
    updateUnit,
    deleteUnit,

    createLesson,
    updateLesson,
    deleteLesson,

    getExercise,
    createExercise,
    updateExercise,
    deleteExercise,
    updateExerciseProgress,

    createExerciseItem,
    updateExerciseItem,
    deleteExerciseItem
};

export const coursesReducer = createReducer(null, {
    [getCourses]: (state, action) => action.data,
    [createCourse]: (state, action) => state ? [...state, action.data] : [action.data],
    [updateCourse]: (state, action) => state.map(course => course.id === action.data.id ? ({ ...course, ...action.data }) : course),
    [deleteCourse]: (state, action) => state.filter(course => course.id !== action.data.id)
});

export const courseReducer = createReducer(null, {
    [getCourse]: (state, action) => action.data,
    [unsetCourse]: (state, action) => null,
    [updateCourse]: (state, action) => ({ ...state, ...action.data }),
    [deleteCourse]: (state, action) => null,

    [createUnit]: (state, action) => ({
        ...state,
        units: state.units.concat(action.data)
    }),
    [updateUnit]: (state, action) => ({
        ...state,
        units: state.units.map(unit => unit.id !== action.data.id ? unit : {
            ...unit,
            ...action.data
        })
    }),
    [deleteUnit]: (state, action) => ({
        ...state,
        units: state.units.filter(unit => unit.id !== action.data.id),
        lessons: state.lessons.filter(lesson => lesson._unit !== action.data.id),
        exercises: state.exercises.filter(exercise => exercise._unit !== action.data.id)
    }),

    [createLesson]: (state, action) => ({
        ...state,
        lessons: state.lessons.concat(action.data),
        units: state.units.map(unit => unit.id !== action.data.unitId ? unit : {
            ...unit,
            _lessons: unit._lessons.concat(action.data.id)
        })
    }),
    [updateLesson]: (state, action) => ({
        ...state,
        lessons: state.lessons.map(lesson => lesson.id !== action.data.id ? lesson : {
            ...lesson,
            ...action.data
        })
    }),
    [deleteLesson]: (state, action) => ({
        ...state,
        lessons: state.lessons.filter(lesson => lesson.id !== action.data.id),
        units: state.units.map(unit => unit.id !== action.data.unitId ? unit : {
            ...unit,
            _lessons: unit._lessons.filter(id => id !== action.data.id)
        }),
        exercises: state.exercises.filter(exercise => exercise.lessonId !== action.data.id)
    }),

    [getExercise]: (state, action) => ({
        ...state,
        exercises: state.exercises.map(exercise => exercise.id !== action.data.id ? exercise : action.data)
    }),
    [createExercise]: (state, action) => ({
        ...state,
        exercises: state.exercises.concat(action.data),
        lessons: state.lessons.map(lesson => lesson.id !== action.data.lessonId ? lesson : {
            ...lesson,
            _exercises: lesson._exercises.concat(action.data.id)
        })
    }),
    [updateExercise]: (state, action) => ({
        ...state,
        exercises: state.exercises.map(lesson => lesson.id !== action.data.id ? lesson : {
            ...lesson,
            ...action.data
        })
    }),
    [deleteExercise]: (state, action) => ({
        ...state,
        exercises: state.exercises.filter(exercise => exercise.id !== action.data.id),
        lessons: state.lessons.map(lesson => lesson.id !== action.data.lesson ? lesson : {
            ...lesson,
            _exercises: lesson._exercises.filter(id => id !== action.data.id)
        })
    }),
    [updateExerciseProgress]: (state, action) => ({
        ...state,
        exercises: state.exercises.map(exercise => exercise.id !== action.data.exerciseId ? exercise : {
            ...exercise,
            progressId: action.data.id,
            submitted: action.data.submitted,
            completed: action.data.completed
        })
    }),

    [createExerciseItem]: (state, action) => ({
        ...state,
        exercises: state.exercises.map(exercise => exercise.id !== action.data.item.exerciseId ? exercise : {
            ...exercise,
            items: action.data.position === undefined ?
                exercise.items.concat(action.data.item) :
                [
                    ...exercise.items.slice(0, action.data.position),
                    action.data.item,
                    ...exercise.items.slice(action.data.position)
                ]
        }),
    }),
    [updateExerciseItem]: (state, action) => ({
        ...state,
        exercises: state.exercises.map(exercise => exercise.id !== action.data.exerciseId ? exercise : {
            ...exercise,
            items: exercise.items.map(item => item.id !== action.data.id ? item : {
                ...item,
                ...action.data
            })
        })
    }),
    [deleteExerciseItem]: (state, action) => ({
        ...state,
        exercises: state.exercises.map(exercise => exercise.id !== action.data.exerciseId ? exercise : {
            ...exercise,
            items: exercise.items.filter(item => item.id !== action.data.id)
        })
    })
});

function toMap(getKey) {
    return array => array?.reduce((map, item) => map.set(getKey(item), item), new Map());
}

const mapById = toMap(item => item.id);
const mapBySlug = toMap(item => item.slug);

export function mapCourse(course) {
    if (!course) return;

    course.unitsById = mapById(course.units);
    course.unitsBySlug = mapBySlug(course.units);
    course.lessonsById = mapById(course.lessons);
    course.lessonsBySlug = mapBySlug(course.lessons);
    course.exercisesById = mapById(course.exercises);

    course.units.forEach(unit => {
        unit.lessons = unit._lessons.map(id => {
            const lesson = course.lessonsById.get(id);

            if (lesson) {
                lesson.unit = unit;
            }

            return lesson;
        });
    });

    course.lessons.forEach(lesson => {
        lesson.exercises = lesson._exercises.map(id => {
            const exercise = course.exercisesById.get(id);

            if (exercise) {
                exercise.lesson = lesson;
            }

            return exercise;
        });
    });

    course.exercises?.forEach(exercise => {
        exercise.lesson = course.lessonsById.get(exercise._lesson);
    });

    return course;
}

export default combineReducers({
    list: coursesReducer,
    single: courseReducer
});