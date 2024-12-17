import { combineReducers } from 'redux';

import meetings from 'shared/store/modules/meetings';
import memberships from 'shared/store/modules/memberships';
import notification from 'shared/store/modules/notification';
import user from 'shared/store/modules/user';

export default combineReducers({
    meetings,
    memberships,
    notification,
    user
});