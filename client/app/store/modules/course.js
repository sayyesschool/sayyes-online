export const GET_COURSE = 'GET_COURSE';

export default function reducer(state = null, action) {
    switch (action.type) {
        case GET_COURSE:
            return mapCourse(action.data);

        default:
            return state;
    }
}

export function getCourse(id) {
    return {
        type: GET_COURSE,
        request: {
            method: 'get',
            url: `/courses/${id}`
        }
    };
}

export const types = {
    GET_COURSE
};

export const actions = {
    getCourse
};

function mapCourse(course) {
    course.unitsById = course.units.reduce((map, unit) => map.set(unit.id, unit), new Map());
    course.lessonsById = course.lessons.reduce((map, lesson) => map.set(lesson.id, lesson), new Map());
    course.exercisesById = course.exercises.reduce((map, exercise) => map.set(exercise.id, exercise), new Map());
    course.audiosByFilename = course.audios.reduce((map, audio) => map.set(audio.filename, audio), new Map());
    course.videosByFilename = course.videos.reduce((map, video) => map.set(video.filename, video), new Map());

    course.units.forEach(unit => {
        unit.lessons = unit._lessons.map(id => {
            const lesson = course.lessonsById.get(id);

            lesson.unitId = unit.id;
            lesson.exercises = lesson._exercises.map((id, index) => {
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