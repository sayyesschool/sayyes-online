import { combineReducers } from 'redux';

import notification from 'shared/actions/notification';
import lessons from './modules/lessons';
import payments from './modules/payments';
import requests from './modules/requests';
import teachers from './modules/teachers';
import users from './modules/users';

export default combineReducers({
    notification,
    lessons,
    payments,
    requests,
    teachers,
    users
});