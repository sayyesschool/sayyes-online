import { combineReducers } from 'redux';

import { courseReducer as course } from 'shared/store/modules/courses';
import { enrollmentReducer as enrollment } from 'shared/store/modules/enrollments';
import notification from 'shared/store/modules/notification';
import user from 'shared/store/modules/user';

export default combineReducers({
    course,
    enrollment,
    notification,
    user
});