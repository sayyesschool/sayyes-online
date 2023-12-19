import { combineReducers } from 'redux';

import notification from 'shared/store/modules/notification';
import user from 'shared/store/modules/user';
import meetings from 'shared/store/modules/meetings';

export default combineReducers({
    notification,
    meetings,
    user
});