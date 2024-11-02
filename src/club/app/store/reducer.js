import { combineReducers } from 'redux';

import meetings from 'shared/store/modules/meetings';
import notification from 'shared/store/modules/notification';
import user from 'shared/store/modules/user';

export default combineReducers({
    notification,
    meetings,
    user
});