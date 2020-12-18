import { combineReducers } from 'redux';

import { assignmentsReducer } from 'shared/store/modules/assignments';
import { enrollmentsReducer } from 'shared/store/modules/enrollments';
import { coursesReducer } from 'shared/store/modules/courses';
import { lessonsReducer } from 'shared/store/modules/lessons';
import { materialsReducer } from 'shared/store/modules/materials';
import notification from 'shared/store/modules/notification';
import { postsReducer } from 'shared/store/modules/posts';
import user from 'shared/store/modules/user';

export default combineReducers({
    assignments: assignmentsReducer,
    enrollments: enrollmentsReducer,
    course: coursesReducer,
    lessons: lessonsReducer,
    materials: materialsReducer,
    notification,
    posts: postsReducer,
    user
});