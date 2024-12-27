import { combineReducers } from 'redux';

import courses from 'shared/store/modules/courses';
import dictionary from 'shared/store/modules/dictionary';
import materials from 'shared/store/modules/materials';
import notification from 'shared/store/modules/notification';
import user from 'shared/store/modules/user';
import vocabularies from 'shared/store/modules/vocabularies';

export default combineReducers({
    courses,
    materials,
    notification,
    user,
    dictionary,
    vocabularies
});