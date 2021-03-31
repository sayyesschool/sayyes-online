import { combineReducers } from 'redux';

import { assignmentReducer } from 'shared/store/modules/assignments';
import { courseReducer } from 'shared/store/modules/courses';
import { enrollmentsReducer, enrollmentReducer } from 'shared/store/modules/enrollments';
import { lessonsReducer } from 'shared/store/modules/lessons';
import { materialReducer } from 'shared/store/modules/materials';
import { meetingsReducer, meetingReducer } from 'shared/store/modules/meetings';
import { paymentsReducer } from 'shared/store/modules/payments';
import { postsReducer, postReducer } from 'shared/store/modules/posts';
import notification from 'shared/store/modules/notification';
import user from 'shared/store/modules/user';

export default combineReducers({
    notification,
    assignment: assignmentReducer,
    course: courseReducer,
    enrollments: enrollmentsReducer,
    enrollment: enrollmentReducer,
    lessons: lessonsReducer,
    material: materialReducer,
    meetings: meetingsReducer,
    meeting: meetingReducer,
    payments: paymentsReducer,
    posts: postsReducer,
    //post: postReducer,
    user
});