import { combineReducers } from 'redux';

import notification from 'shared/store/actions/notification';

import course from './modules/course';
import enrollments from './modules/enrollments';
import payments from './modules/payments';
import user from './modules/user';

export default combineReducers({
    notification,
    course,
    enrollments,
    payments,
    user
});