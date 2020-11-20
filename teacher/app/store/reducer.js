import { combineReducers } from 'redux';

import enrollments from 'shared/store/modules/enrollments';
import lessons from 'shared/store/modules/lessons';
import notification from 'shared/store/modules/notification';
import user from 'shared/store/modules/user';

export default combineReducers({
    enrollments,
    lessons,
    notification,
    user
});