const expect = require('expect');

const { at } = require('../../../helpers');

const { models: { Lesson, Room } } = global.$context;

let room;

describe('Room model', () => {
    before(async () => {
        room = await Room.create({ title: 'A', active: true });
    });

    afterEach(async () => {
        await Lesson.deleteMany({});
    });

    after(async () => {
        await Room.deleteMany({});
    });

    describe('is available', () => {
        it('if the previous lesson ends (11:00) more than 10 minutes before the requested period starts (12:00)', async () => {
            await Lesson.create({
                date: at('10:00'),
                duration: 60,
                roomId: room.id
            });

            (await availableRoom('12:00-13:00')).toExist();
        });

        it('if the previous lesson ends (10:50) 10 minutes before the requested period starts (11:00)', async () => {
            await Lesson.create({
                date: at('10:00'),
                duration: 50,
                roomId: room.id
            });

            (await availableRoom('11:00-12:00')).toExist();
        });

        it('if the next lesson starts (12:00) more than 10 minutes after the requested period ends (11:00)', async () => {
            await Lesson.create({
                date: at('12:00'),
                duration: 60,
                roomId: room.id
            });

            (await availableRoom('10:00-11:00')).toExist();
        });

        it('if the next lesson starts (12:00) 10 minutes after the requested period ends (11:50)', async () => {
            await Lesson.create({
                date: at('12:00'),
                duration: 60,
                roomId: room.id
            });

            (await availableRoom('11:00-11:50')).toExist();
        });

        it('if the previous lesson ends (10:00) more than 10 minutes before the requested period starts (11:00) AND the next lesson starts (12:00) more than 10 minutes after the requested period ends (12:00)', async () => {
            await Lesson.create([
                {
                    date: at('09:00'),
                    duration: 60,
                    roomId: room.id
                },
                {
                    date: at('13:00'),
                    duration: 60,
                    roomId: room.id
                }
            ]);

            (await availableRoom('11:00-12:00')).toExist();
        });

        it('if the previous lesson ends (09:50) 10 minutes before the requested period starts (10:00) AND the next lesson starts (11:30) 10 minutes after the requested period ends (11:20)', async () => {
            await Lesson.create([
                {
                    date: at('09:00'),
                    duration: 50,
                    roomId: room.id
                },
                {
                    date: at('11:30'),
                    duration: 30,
                    roomId: room.id
                }
            ]);

            (await availableRoom('10:00-11:20')).toExist();
        });
    });

    describe('is not available', () => {
        it('if the previous lesson ends (11:00) after the requested period starts (10:30)', async () => {
            await Lesson.create({
                date: at('10:00'),
                duration: 60,
                roomId: room.id
            });

            (await availableRoom('10:30-11:30')).toNotExist();
        });

        it('if the previous lesson ends (11:00) when the requested period starts (11:00)', async () => {
            await Lesson.create({
                date: at('10:00'),
                duration: 60,
                roomId: room.id
            });

            (await availableRoom('11:00-12:00')).toNotExist();
        });

        it('if the previous lesson ends (10:55) less then 10 minutes before the requested period starts (11:00)', async () => {
            await Lesson.create({
                date: at('10:00'),
                duration: 55,
                roomId: room.id
            });

            (await availableRoom('11:00-12:00')).toNotExist();
        });

        it('if the next lesson starts (10:30) before the requested period ends (11:00)', async () => {
            await Lesson.create({
                date: at('10:30'),
                duration: 60,
                roomId: room.id
            });

            (await availableRoom('10:00-11:00')).toNotExist();
        });

        it('if the next lesson starts (11:00) at the same time the requested period ends (11:00)', async () => {
            await Lesson.create({
                date: at('11:00'),
                duration: 60,
                roomId: room.id
            });

            (await availableRoom('10:00-11:00')).toNotExist();
        });

        it('if the next lesson starts (11:05) less then 10 minutes after the requested period ends (11:00)', async () => {
            await Lesson.create({
                date: at('11:05'),
                duration: 55,
                roomId: room.id
            });

            (await availableRoom('10:00-11:00')).toNotExist();
        });
    });
});

async function availableRoom(time = '00:00') {
    const [from, to] = time.split('-');

    const room = await Room.findAvailable(at(from), at(to));

    return expect(room);
}