import { combineReducers } from 'redux';

import courses from 'shared/store/modules/courses';
import enrollments from 'shared/store/modules/enrollments';
import learners from 'shared/store/modules/learners';
import lessons from 'shared/store/modules/lessons';
import managers from 'shared/store/modules/managers';
import materials from 'shared/store/modules/materials';
import meetings from 'shared/store/modules/meetings';
import memberships from 'shared/store/modules/memberships';
import notification from 'shared/store/modules/notification';
import packs from 'shared/store/modules/packs';
import payments from 'shared/store/modules/payments';
import requests from 'shared/store/modules/requests';
import rooms from 'shared/store/modules/rooms';
import tasks from 'shared/store/modules/tasks';
import teachers from 'shared/store/modules/teachers';
import user from 'shared/store/modules/user';
import { reducer as settings } from 'shared/store/settings';

export default combineReducers({
    courses,
    enrollments,
    learners,
    lessons,
    managers,
    materials,
    meetings,
    memberships,
    notification,
    packs,
    payments,
    tasks,
    requests,
    rooms,
    settings,
    teachers,
    user
});