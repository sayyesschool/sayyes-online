import { applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import client from 'shared/api';
import api from 'shared/store/middleware/api';
import notification from 'shared/store/middleware/notification';

export default composeWithDevTools(
    applyMiddleware(api(client, '/admin/api'), notification, promise)
);