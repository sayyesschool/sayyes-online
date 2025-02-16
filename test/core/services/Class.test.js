import { rejects } from 'node:assert/strict';

import expect from 'expect';

import datetime from 'shared/libs/datetime';

import { context, withRoom } from 'test/_env';
import { withModel } from 'test/_env/helpers';

const {
    models: { Lesson },
    services: { Class }
} = context;

describe('ClassService', () => {
    describe('scheduleLesson', () => {
        withModel(Lesson, { afterEach: true });

        describe('with one room', () => {
            const room = withRoom({ title: 'A', active: true });

            describe('from same timezone', () => {
                it('schedules for different times', async () => {
                    await Class.scheduleLesson({
                        date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                        duration: 60
                    });

                    await Class.scheduleLesson({
                        date: datetime.tz('2023-04-03T12:00', 'Europe/Moscow').toDate(),
                        duration: 60
                    });

                    const roomWithLessons = await room.populate('lessons');

                    expect(roomWithLessons.lessons.length).toEqual(2);
                });

                it('throws for same time', async () => {
                    await Class.scheduleLesson({
                        date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                        duration: 60
                    });

                    await rejects(async () => {
                        await Class.scheduleLesson({
                            date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                            duration: 60
                        });
                    }, {
                        message: 'Нет свободной аудитории.'
                    });
                });
            });

            describe('from different timezones', () => {
                it('schedules for different times', async () => {
                    await Class.scheduleLesson({
                        date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                        duration: 60
                    });

                    await Class.scheduleLesson({
                        date: datetime.tz('2023-04-03T10:00', 'Asia/Novosibirsk').toDate(),
                        duration: 60
                    });

                    const roomWithLessons = await room.populate('lessons');

                    expect(roomWithLessons.lessons.length).toEqual(2);
                });

                it('throws for same time', async () => {
                    await Class.scheduleLesson({
                        date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                        duration: 60
                    });

                    await rejects(async () => {
                        await Class.scheduleLesson({
                            date: datetime.tz('2023-04-03T14:00', 'Asia/Novosibirsk').toDate(),
                            duration: 60
                        });
                    }, {
                        message: 'Нет свободной аудитории.'
                    });
                });
            });
        });

        describe('with two rooms', () => {
            withRoom({ title: 'A', active: true });
            withRoom({ title: 'B', active: true });

            describe('from same timezone', () => {
                it('schedules for different times', async () => {
                    const lesson1 = await Class.scheduleLesson({
                        date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                        duration: 60
                    });

                    const lesson2 = await Class.scheduleLesson({
                        date: datetime.tz('2023-04-03T12:00', 'Europe/Moscow').toDate(),
                        duration: 60
                    });

                    expect(lesson1.roomId).toExist();
                    expect(lesson2.roomId).toExist();
                });

                it('schedules for same time', async () => {
                    const lesson1 = await Class.scheduleLesson({
                        date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                        duration: 60
                    });

                    const lesson2 = await Class.scheduleLesson({
                        date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                        duration: 60
                    });

                    expect(lesson1.roomId).toExist();
                    expect(lesson2.roomId).toExist();
                    expect(lesson1.roomId).toNotEqual(lesson2.roomId);
                });
            });

            describe('from from different timezones', () => {
                it('schedules for different times', async () => {
                    const lesson1 = await Class.scheduleLesson({
                        date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                        duration: 60
                    });

                    const lesson2 = await Class.scheduleLesson({
                        date: datetime.tz('2023-04-03T10:00', 'Asia/Novosibirsk').toDate(),
                        duration: 60
                    });

                    expect(lesson1.roomId).toExist();
                    expect(lesson2.roomId).toExist();
                });

                it('schedules for same time', async () => {
                    const lesson1 = await Class.scheduleLesson({
                        date: datetime.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                        duration: 60
                    });

                    const lesson2 = await Class.scheduleLesson({
                        date: datetime.tz('2023-04-03T14:00', 'Asia/Novosibirsk').toDate(),
                        duration: 60
                    });

                    expect(lesson1.roomId).toExist();
                    expect(lesson2.roomId).toExist();
                    expect(lesson1.roomId).toNotEqual(lesson2.roomId);
                });
            });
        });
    });
});