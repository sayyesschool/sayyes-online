import { combineReducers } from 'redux';

import notification from 'shared/store/actions/notification';
import account from './modules/account';
import lessons from './modules/lessons';
import payments from './modules/payments';

export default combineReducers({
    notification,
    account,
    lessons,
    payments
});