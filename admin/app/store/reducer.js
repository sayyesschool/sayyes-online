import { combineReducers } from 'redux';

import notification from 'shared/actions/notification';
import lessons from './modules/lessons';
import payments from './modules/payments';
import users from './modules/users';

export default combineReducers({
    notification,
    lessons,
    payments,
    users
});