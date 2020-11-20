import { combineReducers } from 'redux';

import clients from './modules/clients';
import courses from './modules/courses';
import enrollments from './modules/enrollments';
import notification from './modules/notification';
import lessons from './modules/lessons';
import managers from './modules/managers';
import materials from './modules/materials';
import meetings from './modules/meetings';
import payments from './modules/payments';
import requests from './modules/requests';
import teachers from './modules/teachers';
import tickets from './modules/tickets';
import user from './modules/user';

export default combineReducers({
    clients,
    courses,
    enrollments,
    notification,
    lessons,
    managers,
    materials,
    meetings,
    payments,
    requests,
    teachers,
    tickets,
    user
});