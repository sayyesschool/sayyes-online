import { combineReducers } from 'redux';

import courses from 'shared/store/modules/courses';
import materials from 'shared/store/modules/materials';
import notification from 'shared/store/modules/notification';
import user from 'shared/store/modules/user';

export default combineReducers({
    courses,
    materials,
    notification,
    user
});