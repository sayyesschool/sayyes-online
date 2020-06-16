import { applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import api from 'shared/middleware/api';
import notification from 'shared/middleware/notification';

export default composeWithDevTools(
    applyMiddleware(api('/admin/api'), notification, promise)
);