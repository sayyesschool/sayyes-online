export function mapLesson(lesson) {
    const data = lesson.toJSON();

    data.learner = lesson.learner && {
        id: lesson.learner.id,
        name: lesson.learner.fullname
    };
    data.teacher = lesson.teacher && {
        id: lesson.teacher.id,
        name: lesson.teacher.fullname
    };

    return data;
}