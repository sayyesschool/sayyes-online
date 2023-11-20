import { combineReducers } from 'redux';

import { assignmentsReducer as assignments } from 'shared/store/modules/assignments';
import { courseReducer as course } from 'shared/store/modules/courses';
import { enrollmentReducer as enrollment } from 'shared/store/modules/enrollments';
import notification from 'shared/store/modules/notification';
import user from 'shared/store/modules/user';

export default combineReducers({
    assignments,
    course,
    enrollment,
    notification,
    user
});