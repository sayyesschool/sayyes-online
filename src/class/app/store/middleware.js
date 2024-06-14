import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import promise from 'redux-promise';

import client from 'shared/services/api';
import notification from 'shared/store/middleware/notification';
import request from 'shared/store/middleware/request';

export default composeWithDevTools(
    applyMiddleware(request(client, '/api'), notification, promise.default)
);