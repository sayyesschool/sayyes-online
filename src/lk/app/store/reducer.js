import { combineReducers } from 'redux';

import { courseReducer } from 'shared/store/modules/courses';
import { enrollmentReducer, enrollmentsReducer } from 'shared/store/modules/enrollments';
import { lessonsReducer } from 'shared/store/modules/lessons';
import { materialReducer } from 'shared/store/modules/materials';
import notification from 'shared/store/modules/notification';
import { paymentsReducer } from 'shared/store/modules/payments';
import { postsReducer } from 'shared/store/modules/posts';
import user from 'shared/store/modules/user';

export default combineReducers({
    course: courseReducer,
    enrollments: enrollmentsReducer,
    enrollment: enrollmentReducer,
    lessons: lessonsReducer,
    material: materialReducer,
    notification,
    payments: paymentsReducer,
    posts: postsReducer,
    user
});