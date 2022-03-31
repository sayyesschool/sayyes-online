module.exports = ({
    models: { Lesson, Room }
}) => ({
    resolveScheduleConflict: async (req, res, next) => {
        if (!req.body.date) return next();

        const today = new Date();
        const date = new Date(req.body.date);

        if (date < today) return next();

        const conflictingLesson = await Lesson.findConflicting(req.body.date, req.body.duration);

        if (conflictingLesson) return next('Время уже занято.');

        const availableRoom = await Room.findAvailable(req.body.date, req.body.duration);

        if (!availableRoom) return next('Нет свободной аудитории.');

        req.body.room = availableRoom.id;
        req.room = availableRoom;

        next();
    }
});