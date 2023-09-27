module.exports = ({
    models: { Lesson, Room }
}) => ({
    resolveScheduleConflict: async (req, res, next) => {
        if (!req.body.date) return next();

        const conflictingLesson = await Lesson.findConflicting(req.user.id, req.body.date, req.body.duration);

        if (conflictingLesson)
            return next({
                status: 400,
                message: 'Время уже занято.'
            });

        const availableRoom = await Room.findAvailable(req.body.date, req.body.duration);

        if (!availableRoom)
            return next({
                status: 400,
                message: 'Нет свободной аудитории.'
            });

        req.body.room = availableRoom.id;
        req.room = availableRoom;

        next();
    }
});