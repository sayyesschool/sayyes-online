import { rejects } from 'node:assert/strict';

import expect from 'expect';
import moment from 'moment-timezone';
import { model } from 'mongoose';

import LessonSchema from '@/core/models/lesson/Lesson.js';
import RoomSchema from '@/core/models/room/Room.js';
import ScheduleService from '@/core/services/schedule.js';

const Lesson = model('Lesson', LessonSchema);
const Room = model('Room', RoomSchema);

const scheduleService = ScheduleService({ models: { Lesson, Room } });

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
                await scheduleService.scheduleLesson({
                    date: moment.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                await scheduleService.scheduleLesson({
                    date: moment.tz('2023-04-03T12:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                const roomWithLessons = await room.populate('lessons');

                expect(roomWithLessons.lessons.length).toEqual(2);
            });

            it('should not be able to schedule a lesson at the same time', async () => {
                await scheduleService.scheduleLesson({
                    date: moment.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                await rejects(async () => {
                    await scheduleService.scheduleLesson({
                        date: moment.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                        duration: 60
                    });
                }, {
                    message: 'Нет свободной аудитории.'
                });
            });
        });

        describe('two teachers from different timezones', () => {
            it('should be able to schedule a lesson at different times', async () => {
                await scheduleService.scheduleLesson({
                    date: moment.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                await scheduleService.scheduleLesson({
                    date: moment.tz('2023-04-03T10:00', 'Asia/Novosibirsk').toDate(),
                    duration: 60
                });

                const roomWithLessons = await room.populate('lessons');

                expect(roomWithLessons.lessons.length).toEqual(2);
            });

            it('should not be able to schedule a lesson at the same time', async () => {
                await scheduleService.scheduleLesson({
                    date: moment.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                await rejects(async () => {
                    await scheduleService.scheduleLesson({
                        date: moment.tz('2023-04-03T14:00', 'Asia/Novosibirsk').toDate(),
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
                const lesson1 = await scheduleService.scheduleLesson({
                    date: moment.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                const lesson2 = await scheduleService.scheduleLesson({
                    date: moment.tz('2023-04-03T12:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                expect(lesson1.roomId).toExist();
                expect(lesson2.roomId).toExist();
            });

            it('should be able to schedule a lesson at the same time', async () => {
                const lesson1 = await scheduleService.scheduleLesson({
                    date: moment.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                const lesson2 = await scheduleService.scheduleLesson({
                    date: moment.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                expect(lesson1.roomId).toExist();
                expect(lesson2.roomId).toExist();
            });
        });

        describe('two teachers from different timezones', () => {
            it('should be able to schedule a lesson at different times', async () => {
                const lesson1 = await scheduleService.scheduleLesson({
                    date: moment.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                const lesson2 = await scheduleService.scheduleLesson({
                    date: moment.tz('2023-04-03T10:00', 'Asia/Novosibirsk').toDate(),
                    duration: 60
                });

                expect(lesson1.roomId).toExist();
                expect(lesson2.roomId).toExist();
            });

            it('should be able to schedule a lesson at the same time', async () => {
                const lesson1 = await scheduleService.scheduleLesson({
                    date: moment.tz('2023-04-03T10:00', 'Europe/Moscow').toDate(),
                    duration: 60
                });

                const lesson2 = await scheduleService.scheduleLesson({
                    date: moment.tz('2023-04-03T14:00', 'Asia/Novosibirsk').toDate(),
                    duration: 60
                });

                expect(lesson1.roomId).toExist();
                expect(lesson2.roomId).toExist();
            });
        });
    });
});