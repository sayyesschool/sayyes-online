function mapLesson(lesson, user) {
    const data = lesson.toJSON();

    data.client = {
        id: lesson.client.id,
        name: lesson.client.fullname
    };
    data.teacher = {
        id: lesson.teacher.id,
        name: lesson.teacher.fullname
    };

    return data;
}

module.exports = {
    mapLesson
};