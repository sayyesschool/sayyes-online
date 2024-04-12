import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import promise from 'redux-promise';

import client from 'shared/services/api';
import api from 'shared/store/middleware/api';
import notification from 'shared/store/middleware/notification';

export default composeWithDevTools(
    applyMiddleware(api(client, '/api'), notification, promise)
);