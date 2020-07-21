import { combineReducers } from 'redux';

import notification from 'shared/store/actions/notification';
import clients from './modules/clients';
import lessons from './modules/lessons';
import payments from './modules/payments';
import requests from './modules/requests';
import teachers from './modules/teachers';

export default combineReducers({
    clients,
    notification,
    lessons,
    payments,
    requests,
    teachers
});