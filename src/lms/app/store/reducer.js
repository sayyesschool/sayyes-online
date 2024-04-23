import { combineReducers } from 'redux';

import assignments from 'shared/store/modules/assignments';
import courses from 'shared/store/modules/courses';
import enrollments from 'shared/store/modules/enrollments';
import exercises from 'shared/store/modules/exercises';
import lessons from 'shared/store/modules/lessons';
import materials from 'shared/store/modules/materials';
import notification from 'shared/store/modules/notification';
import posts from 'shared/store/modules/posts';
import user from 'shared/store/modules/user';
import vocabularies from 'shared/store/modules/vocabularies';

export default combineReducers({
    assignments,
    courses,
    enrollments,
    exercises,
    lessons,
    materials,
    notification,
    posts,
    vocabularies,
    user
});