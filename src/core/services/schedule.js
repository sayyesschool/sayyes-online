const moment = require('moment');

module.exports = ({ models: {
    Lesson,
    Room
} }) => ({
    async scheduleLesson({ id, ...data }) {
        const room = await this.getAvailableRoom(data);

        this.checkConflictingLesson({
            ...data,
            roomId: room.id
        });

        data.roomId = room.id;

        return id ? 
            Lesson.findByIdAndUpdate(id, data, {
                new: true,
            }) :
            Lesson.create(data);
    },

    async checkConflictingLesson(data) {
        const conflictingLesson = await Lesson.findConflicting(data);

        if (conflictingLesson) throw {
            status: 400,
            message: 'Время уже занято.'
        };
    },
    
    async getAvailableRoom({ date, duration }) {
        const endDate = moment(date).add(duration, 'minutes').toDate();

        const availableRoom = await Room.findAvailable(date, endDate);

        if (!availableRoom) throw {
            status: 400,
            message: 'Нет свободной аудитории.'
        };

        return availableRoom;
    }
});