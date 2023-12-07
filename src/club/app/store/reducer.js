import { combineReducers } from 'redux';

import notification from 'shared/store/modules/notification';

import account from './modules/account';
import meetings from './modules/meetings';
import tickets from './modules/tickets';

export default combineReducers({
    notification,
    account,
    meetings,
    tickets
});