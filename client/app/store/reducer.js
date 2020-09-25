import { combineReducers } from 'redux';

import notification from 'shared/store/actions/notification';
import account from './modules/account';
import enrollments from './modules/enrollments';
import payments from './modules/payments';

export default combineReducers({
    notification,
    account,
    enrollments,
    payments
});