import expect from 'expect';
import { model } from 'mongoose';
import sinon from 'sinon';

import LessonSchema from '@/core/models/lesson/Lesson.js';

const Lesson = model('Lesson', LessonSchema);

const sampleLessons = [
    new Lesson({
        roomId: '65e9ef5c6e9d21a8081588d0',
        date: '2024-03-07T10:00'
    })
];

sinon.stub(Lesson, 'find').returnsQuery(sampleLessons);

describe('Lesson', () => {
    describe('findConflicting', () => {
        it('should return a conflicting lesson if there is a conflict', async () => {
            const conflictingLesson = await Lesson.findConflicting({
                roomId: '2',
                date: '2024-03-07T09:00',
                duration: 90
            });

            expect(conflictingLesson).toExist();
        });

        it('should not return a conflicting lesson if there is no conflict', async () => {
            const conflictingLesson = await Lesson.findConflicting({
                roomId: '2',
                date: '2024-03-07T08:00',
                duration: 90
            });

            expect(conflictingLesson).toNotExist();
        });
    });
});