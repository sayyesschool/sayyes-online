function mapLesson(lesson) {
    const data = lesson.toJSON();

    data.client = lesson.client && {
        id: lesson.client.id,
        name: lesson.client.fullname
    };
    data.teacher = lesson.teacher && {
        id: lesson.teacher.id,
        name: lesson.teacher.fullname
    };

    return data;
}

module.exports = {
    mapLesson
};