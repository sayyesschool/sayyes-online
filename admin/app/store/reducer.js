import { combineReducers } from 'redux';

import clients from 'shared/store/modules/clients';
import courses from 'shared/store/modules/courses';
import enrollments from 'shared/store/modules/enrollments';
import lessons from 'shared/store/modules/lessons';
import managers from 'shared/store/modules/managers';
import materials from 'shared/store/modules/materials';
import meetings from 'shared/store/modules/meetings';
import notification from 'shared/store/modules/notification';
import packs from 'shared/store/modules/packs';
import payments from 'shared/store/modules/payments';
import requests from 'shared/store/modules/requests';
import rooms from 'shared/store/modules/rooms';
import teachers from 'shared/store/modules/teachers';
import tickets from 'shared/store/modules/tickets';
import user from 'shared/store/modules/user';

export default combineReducers({
    clients,
    courses,
    enrollments,
    lessons,
    managers,
    materials,
    meetings,
    notification,
    packs,
    payments,
    requests,
    rooms,
    teachers,
    tickets,
    user
});