import { createAction, createReducer, combineReducers } from 'shared/store/helpers';

// Courses

export const getCourses = createAction('GET_COURSES', query => {
    return {
        request: {
            method: 'get',
            path: 'courses',
            query
        }
    };
});

export const getCourse = createAction('GET_COURSE', (courseId, query) => ({
    request: {
        method: 'get',
        path: `courses/${courseId}`,
        query
    }
}));

export const unsetCourse = createAction('UNSET_COURSE');

export const createCourse = createAction('CREATE_COURSE', data => ({
    request: {
        method: 'post',
        path: 'courses',
        body: data
    }
}));

export const updateCourse = createAction('UPDATE_COURSE', (courseId, data) => ({
    request: {
        method: 'put',
        path: `courses/${courseId}`,
        body: data
    }
}));

export const deleteCourse = createAction('DELETE_COURSE', courseId => ({
    request: {
        method: 'delete',
        path: `courses/${courseId}`
    }
}));


// Units

export const createUnit = createAction('CREATE_COURSE_UNIT', (courseId, data) => ({
    request: {
        method: 'post',
        path: `courses/${courseId}/units`,
        body: data
    }
}));

export const updateUnit = createAction('UPDATE_COURSE_UNIT', (courseId, unitId, data) => ({
    request: {
        method: 'put',
        path: `courses/${courseId}/units/${unitId}`,
        body: data
    }
}));

export const deleteUnit = createAction('DELETE_COURSE_UNIT', (courseId, unitId) => ({
    request: {
        method: 'delete',
        path: `courses/${courseId}/units/${unitId}`
    }
}));


// Lessons

export const createLesson = createAction('CREATE_COURSE_LESSON', (courseId, data) => ({
    request: {
        method: 'post',
        path: `courses/${courseId}/lessons`,
        body: data
    }
}));

export const updateLesson = createAction('UPDATE_COURSE_LESSON', (courseId, lessonId, data) => ({
    request: {
        method: 'put',
        path: `courses/${courseId}/lessons/${lessonId}`,
        body: data
    }
}));

export const deleteLesson = createAction('DELETE_COURSE_LESSON', (courseId, lessonId) => ({
    request: {
        method: 'delete',
        path: `courses/${courseId}/lessons/${lessonId}`,
    }
}));


// Sections

export const createSection = createAction('CREATE_COURSE_SECTION', (courseId, data) => ({
    request: {
        method: 'post',
        path: `courses/${courseId}/sections`,
        body: data
    }
}));

export const updateSection = createAction('UPDATE_COURSE_SECTION', (courseId, sectionId, data) => ({
    request: {
        method: 'put',
        path: `courses/${courseId}/sections/${sectionId}`,
        body: data
    }
}));

export const deleteSection = createAction('DELETE_COURSE_SECTION', (courseId, sectionId) => ({
    request: {
        method: 'delete',
        path: `courses/${courseId}/sections/${sectionId}`,
    }
}));

export const getSectionExercises = createAction('GET_COURSE_SECTION_EXERCISES', (courseId, sectionId) => ({
    request: {
        method: 'get',
        path: `courses/${courseId}/sections/${sectionId}/exercises`
    }
}));


// Exercises

export const getExercise = createAction('GET_COURSE_EXERCISE', (courseId, exerciseId) => ({
    request: {
        method: 'get',
        path: `courses/${courseId}/exercises/${exerciseId}`
    }
}));

export const createExercise = createAction('CREATE_COURSE_EXERCISE', (courseId, data) => ({
    request: {
        method: 'post',
        path: `courses/${courseId}/exercises`,
        body: data
    }
}));

export const updateExercise = createAction('UPDATE_COURSE_EXERCISE', (courseId, exerciseId, data) => ({
    request: {
        method: 'put',
        path: `courses/${courseId}/exercises/${exerciseId}`,
        body: data
    }
}));

export const deleteExercise = createAction('DELETE_COURSE_EXERCISE', (courseId, exerciseId) => ({
    request: {
        method: 'delete',
        path: `courses/${courseId}/exercises/${exerciseId}`
    }
}));


// Items

export const createExerciseItem = createAction('CREATE_COURSE_EXERCISE_ITEM', (courseId, exerciseId, data) => ({
    request: {
        method: 'post',
        path: `courses/${courseId}/exercises/${exerciseId}/items`,
        body: data
    }
}));

export const updateExerciseItem = createAction('UPDATE_COURSE_EXERCISE_ITEM', (courseId, exerciseId, itemId, data) => ({
    request: {
        method: 'put',
        path: `courses/${courseId}/exercises/${exerciseId}/items/${itemId}`,
        body: data
    }
}));

export const deleteExerciseItem = createAction('DELETE_COURSE_EXERCISE_ITEM', (courseId, exerciseId, itemId, body) => ({
    request: {
        method: 'delete',
        path: `courses/${courseId}/exercises/${exerciseId}/items/${itemId}`,
        body
    }
}));


// Progress

export const updateExerciseProgress = createAction('UPDATE_COURSE_EXERCISE_PROGRESS', (progressId = '', data) => ({
    request: {
        method: 'post',
        path: `progress/${progressId}`,
        body: data
    }
}));


// Comments

export const createExerciseComment = createAction('CREATE_EXERCISE_COMMENT', (courseId, exerciseId, data) => ({
    request: {
        method: 'post',
        path: `courses/${courseId}/exercises/${exerciseId}/comments`,
        body: data
    }
}));

export const updateExerciseComment = createAction('UPDATE_EXERCISE_COMMENT', (courseId, exerciseId, commentId, data) => ({
    request: {
        method: 'put',
        path: `courses/${courseId}/exercises/${exerciseId}/comments/${commentId}`,
        body: data
    }
}));

export const deleteExerciseComment = createAction('DELETE_EXERCISE_COMMENT', (courseId, exerciseId, commentId, data) => ({
    request: {
        method: 'delete',
        path: `courses/${courseId}/exercises/${exerciseId}/comments/${commentId}`,
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

    createSection,
    updateSection,
    deleteSection,
    getSectionExercises,

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

    [createSection]: (state, action) => ({
        ...state,
        sections: state.sections.concat(action.data),
        lessons: state.lessons.map(lesson => lesson.id !== action.data.lessonId ? lesson : {
            ...lesson,
            _sections: lesson._sections.concat(action.data.id)
        })
    }),
    [updateSection]: (state, action) => ({
        ...state,
        sections: state.sections.map(section => section.id !== action.data.id ? section : {
            ...section,
            ...action.data
        })
    }),
    [deleteSection]: (state, action) => ({
        ...state,
        sections: state.sections.filter(section => section.id !== action.data.id),
        lessons: state.lessons.map(lesson => lesson.id !== action.data.lessonId ? lesson : {
            ...lesson,
            _sections: lesson._sections.filter(id => id !== action.data.id)
        }),
        exercises: state.exercises.filter(exercise => exercise.lessonId !== action.data.id)
    }),

    [getExercise]: (state, action) => ({
        ...state,
        exercises: state.exercises.map(exercise =>
            exercise.id !== action.data.id ? exercise : action.data
        )
    }),
    [createExercise]: (state, action) => ({
        ...state,
        exercises: state.exercises.concat(action.data),
        sections: state.sections.map(section =>
            section.id !== action.data.sectionId ? section : {
                ...section,
                _exercises: section._exercises.concat(action.data.id)
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
        sections: state.sections.map(section => section.id !== action.data.section ? section : {
            ...section,
            _exercises: section._exercises.filter(id => id !== action.data.id)
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
    return (array = []) => array.reduce((map, item) => map.set(getKey(item), item), new Map());
}

const mapById = toMap(item => item.id);

export function mapCourse(course) {
    if (!course) return;

    course.unitsById = mapById(course.units);
    course.lessonsById = mapById(course.lessons);
    course.sectionsById = mapById(course.sections);
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
        lesson.sections = lesson._sections.map(id => {
            const section = course.sectionsById.get(id);

            if (section) {
                section.lesson = lesson;
            }

            return section;
        });
    });

    course.sections.forEach(section => {
        section.exercises = section._exercises.map(id => {
            const exercise = course.exercisesById.get(id);

            if (exercise) {
                exercise.section = section;
            }

            return exercise;
        }).filter(Boolean);
    });

    return course;
}

export default combineReducers({
    list: coursesReducer,
    single: courseReducer
});