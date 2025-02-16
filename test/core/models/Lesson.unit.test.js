import expect from 'expect';
import { model } from 'mongoose';

import { LessonSchema } from 'core/models/lesson';

import { stub } from 'test/helpers';

const Lesson = model('Lesson', LessonSchema);

const sampleLessons = [
    new Lesson({
        roomId: '65e9ef5c6e9d21a8081588d0',
        date: '2024-03-07T10:00'
    })
];

stub(Lesson, 'find').returnsQuery(sampleLessons);

describe('Lesson', () => {
    describe('findConflicting', () => {
        it('returns a conflicting lesson if there is a conflict', async () => {
            const conflictingLesson = await Lesson.findConflicting({
                roomId: '2',
                date: '2024-03-07T09:00',
                duration: 90
            });

            expect(conflictingLesson).toExist();
        });

        it('does NOT return a conflicting lesson if there is no conflict', async () => {
            const conflictingLesson = await Lesson.findConflicting({
                roomId: '2',
                date: '2024-03-07T08:00',
                duration: 90
            });

            expect(conflictingLesson).toNotExist();
        });
    });
});