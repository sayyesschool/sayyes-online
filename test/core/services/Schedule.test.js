import { rejects } from 'node:assert/strict';

import expect from 'expect';

import datetime from 'shared/libs/datetime';

import { context } from 'test/_env';

const {
    models: { Room, Lesson },
    services: { Schedule }
} = context;

describe('ScheduleService', () => {
    afterEach(async () => {
        await Room.deleteMany({});
        await Lesson.deleteMany({});
    });

    describe('having one available room', () => {
        let room;

        beforeEach(async () => {
            room = await Room.create({ title: 'A', active: true });
        });

        describe('two teachers from the same timezone', () => {
            it('should be able to schedule a lesson at different times', async () => {
                await Schedule.scheduleLesson({
                    date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                await Schedule.scheduleLesson({
                    date: datetime.tz('2023-04-03T12:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                const roomWithLessons = await room.populate('lessons');

                expect(roomWithLessons.lessons.length).toEqual(2);
            });

            it('should not be able to schedule a lesson at the same time', async () => {
                await Schedule.scheduleLesson({
                    date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                await rejects(async () => {
                    await Schedule.scheduleLesson({
                        date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                        duration: 60
                    });
                }, {
                    message: 'Нет свободной аудитории.'
                });
            });
        });

        describe('two teachers from different timezones', () => {
            it('should be able to schedule a lesson at different times', async () => {
                await Schedule.scheduleLesson({
                    date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                await Schedule.scheduleLesson({
                    date: datetime.tz('2023-04-03T10:00', 'Asia/Novosibirsk').toDate(),
                    duration: 60
                });

                const roomWithLessons = await room.populate('lessons');

                expect(roomWithLessons.lessons.length).toEqual(2);
            });

            it('should not be able to schedule a lesson at the same time', async () => {
                await Schedule.scheduleLesson({
                    date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                await rejects(async () => {
                    await Schedule.scheduleLesson({
                        date: datetime.tz('2023-04-03T14:00', 'Asia/Novosibirsk').toDate(),
                        duration: 60
                    });
                }, {
                    message: 'Нет свободной аудитории.'
                });
            });
        });
    });

    describe('having two available rooms', () => {
        beforeEach(async () => {
            await Room.create([
                { title: 'A', active: true },
                { title: 'B', active: true }
            ]);
        });

        describe('two teachers from the same timezone', () => {
            it('should be able to schedule a lesson at different times', async () => {
                const lesson1 = await Schedule.scheduleLesson({
                    date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                const lesson2 = await Schedule.scheduleLesson({
                    date: datetime.tz('2023-04-03T12:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                expect(lesson1.roomId).toExist();
                expect(lesson2.roomId).toExist();
            });

            it('should be able to schedule a lesson at the same time', async () => {
                const lesson1 = await Schedule.scheduleLesson({
                    date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                const lesson2 = await Schedule.scheduleLesson({
                    date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                expect(lesson1.roomId).toExist();
                expect(lesson2.roomId).toExist();
            });
        });

        describe('two teachers from different timezones', () => {
            it('should be able to schedule a lesson at different times', async () => {
                const lesson1 = await Schedule.scheduleLesson({
                    date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                const lesson2 = await Schedule.scheduleLesson({
                    date: datetime.tz('2023-04-03T10:00', 'Asia/Novosibirsk').toDate(),
                    duration: 60
                });

                expect(lesson1.roomId).toExist();
                expect(lesson2.roomId).toExist();
            });

            it('should be able to schedule a lesson at the same time', async () => {
                const lesson1 = await Schedule.scheduleLesson({
                    date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                const lesson2 = await Schedule.scheduleLesson({
                    date: datetime.tz('2023-04-03T14:00', 'Asia/Novosibirsk').toDate(),
                    duration: 60
                });

                expect(lesson1.roomId).toExist();
                expect(lesson2.roomId).toExist();
            });
        });
    });
});