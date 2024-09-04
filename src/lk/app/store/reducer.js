import { combineReducers } from 'redux';

import notification from 'shared/store/modules/notification';
import user from 'shared/store/modules/user';

export default combineReducers({
    notification,
    user
});