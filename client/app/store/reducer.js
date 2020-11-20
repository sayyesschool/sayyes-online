import { combineReducers } from 'redux';

import course from 'shared/store/modules/course';
import notification from 'shared/store/modules/notification';
import enrollments from 'shared/store/modules/enrollments';
import payments from 'shared/store/modules/payments';
import user from 'shared/store/modules/user';

export default combineReducers({
    notification,
    course,
    enrollments,
    payments,
    user
});