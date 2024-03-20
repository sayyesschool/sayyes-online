const expect = require('expect');

const { models: { Lesson, Room } } = global.$context;

describe('Lesson model', () => {
    before(async () => {
        await Lesson.create([
            { status: 'ended', date: new Date().setDate(0) },
            { status: 'scheduled', date: new Date() },
            { status: 'scheduled', date: new Date().setDate(31) }
        ]);
    });

    after(async () => {
        await Lesson.deleteMany({});
    });

    describe('findTodays', () => {
        it('should return a list of lessons for today', async () => {
            const lessons = await Lesson.findTodays();

            expect(lessons.length).toBe(1);
        });
    });

    describe('findScheduled', () => {
        it('should return a list of scheduled lessons', async () => {
            const lessons = await Lesson.findScheduled();

            expect(lessons.length).toBe(2);
        });
    });
});