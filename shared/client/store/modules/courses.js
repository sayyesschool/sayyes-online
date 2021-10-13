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

// Audios

export const createAudio = createAction('CREATE_COURSE_AUDIO', (courseId, data) => ({
    request: {
        method: 'post',
        url: `/courses/${courseId}/audios`,
        body: data
    }
}));

export const updateAudio = createAction('UPDATE_COURSE_AUDIO', (courseId, audioId, data) => ({
    request: {
        method: 'put',
        url: `/courses/${courseId}/audios/${audioId}`,
        body: data
    }
}));

export const deleteAudio = createAction('DELETE_COURSE_AUDIO', (courseId, audioId) => ({
    request: {
        method: 'delete',
        url: `/courses/${courseId}/audios/${audioId}`
    }
}));

// Videos

export const createVideo = createAction('CREATE_COURSE_VIDEO', (courseId, data) => ({
    request: {
        method: 'post',
        url: `/courses/${courseId}/videos`,
        body: data
    }
}));

export const updateVideo = createAction('UPDATE_COURSE_VIDEO', (courseId, videoId, data) => ({
    request: {
        method: 'put',
        url: `/courses/${courseId}/videos/${videoId}`,
        body: data
    }
}));

export const deleteVideo = createAction('DELETE_COURSE_VIDEO', (courseId, videoId) => ({
    request: {
        method: 'delete',
        url: `/courses/${courseId}/videos/${videoId}`
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
    unsetCourse,
    createCourse,
    updateCourse,
    deleteCourse,

    createAudio,
    updateAudio,
    deleteAudio,

    createVideo,
    updateVideo,
    deleteVideo,

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
    [getCourse]: (state, action) => action.data,
    [unsetCourse]: (state, action) => null,
    [updateCourse]: (state, action) => ({ ...state, ...action.data }),
    [deleteCourse]: (state, action) => null,

    [createAudio]: (state, action) => ({
        ...state,
        audios: state.audios.concat(action.data)
    }),
    [updateAudio]: (state, action) => ({
        ...state,
        audios: state.audios.map(audio => audio.id !== action.data.id ? audio : {
            ...audio,
            ...action.data
        })
    }, action.data),
    [deleteAudio]: (state, action) => ({
        ...state,
        audios: state.audios.filter(audio => audio.id !== action.data.id),
        units: state.units.map(unit => !unit.audios.includes(action.data.id) ? unit : {
            ...unit,
            audios: unit.audios.filter(audioId => audioId !== action.data.id)
        }),
        lessons: state.lessons.map(lesson => !lesson.audios.includes(action.data.id) ? lesson : {
            ...lesson,
            audios: lesson.audios.filter(audioId => audioId !== action.data.id)
        }),
        exercises: state.exercises.map(exercise => !exercise.audios.includes(action.data.id) ? exercise : {
            ...exercise,
            audios: exercise.audios.filter(audioId => audioId !== action.data.id)
        })
    }),

    [createVideo]: (state, action) => ({
        ...state,
        videos: state.videos.concat(action.data)
    }),
    [updateVideo]: (state, action) => ({
        ...state,
        videos: state.videos.map(video => video.id !== action.data.id ? video : {
            ...video,
            ...action.data
        })
    }, action.data),
    [deleteVideo]: (state, action) => ({
        ...state,
        videos: state.videos.filter(video => video.id !== action.data.id),
        units: state.units.map(unit => !unit.videos.includes(action.data.id) ? unit : {
            ...unit,
            videos: unit.videos.filter(videoId => videoId !== action.data.id)
        }),
        lessons: state.lessons.map(lesson => !lesson.videos.includes(action.data.id) ? lesson : {
            ...lesson,
            videos: lesson.videos.filter(videoId => videoId !== action.data.id)
        }),
        exercises: state.exercises.map(exercise => !exercise.videos.includes(action.data.id) ? exercise : {
            ...exercise,
            videos: exercise.videos.filter(videoId => videoId !== action.data.id)
        })
    }),

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
    }, action.data),
    [deleteUnit]: (state, action) => ({
        ...state,
        units: state.units.filter(unit => unit.id !== action.data.id),
        lessons: state.lessons.filter(lesson => lesson._unit !== action.data.id),
        exercises: state.exercises.filter(exercise => exercise._unit !== action.data.id)
    }),

    [createLesson]: (state, action) => ({
        ...state,
        lessons: state.lessons.concat(action.data),
        units: state.units.map(unit => unit.id !== action.data.unit ? unit : {
            ...unit,
            lessons: unit.lessons.concat(action.data.id)
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
        units: state.units.map(unit => unit.id !== action.data.unit ? unit : {
            ...unit,
            lessons: unit.lessons.filter(id => id !== action.data.id)
        }),
        exercises: state.exercises.filter(exercise => exercise.lesson !== action.data.id)
    }),

    [createExercise]: (state, action) => ({
        ...state,
        exercises: state.exercises.concat(action.data),
        lessons: state.lessons.map(lesson => lesson.id !== action.data.lesson ? lesson : {
            ...lesson,
            exercises: lesson.exercises.concat(action.data.id)
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
            exercises: lesson.exercises.filter(id => id !== action.data.id)
        })
    })
});

export function mapCourse(course) {
    if (!course) return;

    course.audiosByFilename = course.audios.reduce((map, audio) => map.set(audio.filename, audio), new Map());
    course.videosByFilename = course.videos.reduce((map, video) => map.set(video.filename, video), new Map());
    course.unitsById = course.units.reduce((map, unit) => map.set(unit.id, unit), new Map());
    course.lessonsById = course.lessons.reduce((map, lesson) => map.set(lesson.id, lesson), new Map());
    course.exercisesById = course.exercises.reduce((map, exercise) => map.set(exercise.id, exercise), new Map());

    // course.units.forEach(unit => {
    //     unit.lessons = unit._lessons.map(id => {
    //         const lesson = course.lessonsById.get(id);

    //         if (lesson) {
    //             lesson.unit = unit;
    //         }

    //         return lesson;
    //     });
    // });

    // course.lessons.forEach(lesson => {
    //     lesson.exercises = lesson._exercises.map(id => {
    //         const exercise = course.exercisesById.get(id);

    //         if (exercise) {
    //             exercise.lesson = lesson;
    //         }

    //         return exercise;
    //     });
    // });

    course.exercises.forEach(exercise => {
        exercise.lesson = course.lessonsById.get(exercise._lesson);

        if (exercise.audio) {
            exercise.audio = course.audiosByFilename.get(exercise.audio);
        }
    });

    return course;
}

export default combineReducers({
    list: coursesReducer,
    single: courseReducer
});