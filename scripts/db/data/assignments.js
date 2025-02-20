import { enrollment } from './enrollments';
import { exercise } from './exercises';
import { learner, teacher } from './users';

export default [
    {
        title: 'Assignment 1',
        content: 'Do your homework',
        status: 'assigned',
        dueDate: new Date('2025-01-01T10:00'),
        exerciseIds: [exercise._id],
        enrollmentId: enrollment._id,
        learnerId: learner._id,
        teacherId: teacher._id
    }
];