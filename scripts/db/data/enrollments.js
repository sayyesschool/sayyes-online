import { Types } from 'mongoose';

import { course } from './courses';
import { learner, manager, teacher } from './users';

export const enrollment = {
    _id: new Types.ObjectId().toHexString(),
    status: 'active',
    learnerId: learner._id,
    managerId: manager._id,
    teacherId: teacher._id,
    courseIds: [course._id]
};

export default [enrollment];