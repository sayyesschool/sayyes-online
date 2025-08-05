import { Types } from 'mongoose';

import { course } from './courses';
import { learner, learner2, manager, manager2, teacher, teacher2 } from './users';

export const enrollment = {
    _id: new Types.ObjectId().toHexString(),
    status: 'active',
    learnerId: learner._id,
    managerId: manager._id,
    teacherId: teacher._id,
    courseIds: [course._id]
};

export const enrollment2 = {
    _id: new Types.ObjectId().toHexString(),
    status: 'active',
    learnerId: learner2._id,
    managerId: manager2._id,
    teacherId: teacher2._id,
    courseIds: [course._id]
};

export default [enrollment, enrollment2];