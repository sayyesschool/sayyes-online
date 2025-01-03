import { Schema } from 'mongoose';

export const Teacher = new Schema({
    props: {
        levels: { type: [String] },
        formats: { type: [String] },
        ages: { type: [String] }
    }
});

Teacher.virtual('enrollments', {
    ref: 'Enrollment',
    localField: '_id',
    foreignField: 'teacherId'
});

Teacher.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'teacherId'
});

Teacher.virtual('meetings', {
    ref: 'Meeting',
    localField: '_id',
    foreignField: 'hostId'
});

export default Teacher;