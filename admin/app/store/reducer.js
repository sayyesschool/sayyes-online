import { combineReducers } from 'redux';

import clients from './modules/clients';
import enrollments from './modules/enrollments';
import notification from './modules/notification';
import lessons from './modules/lessons';
import managers from './modules/managers';
import payments from './modules/payments';
import requests from './modules/requests';
import teachers from './modules/teachers';
import user from './modules/user';

export default combineReducers({
    clients,
    enrollments,
    notification,
    lessons,
    managers,
    payments,
    requests,
    teachers,
    user
});