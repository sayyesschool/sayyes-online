import { combineReducers } from 'redux';

import enrollments from 'shared/store/modules/enrollments';
import courses from 'shared/store/modules/courses';
import lessons from 'shared/store/modules/lessons';
import materials from 'shared/store/modules/materials';
import notification from 'shared/store/modules/notification';
import posts from 'shared/store/modules/posts';
import user from 'shared/store/modules/user';

export default combineReducers({
    enrollments,
    courses,
    lessons,
    materials,
    notification,
    posts,
    user
});