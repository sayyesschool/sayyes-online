import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import promise from 'redux-promise';

import http from 'shared/services/http';
import notification from 'shared/store/middleware/notification';
import request from 'shared/store/middleware/request';

export default composeWithDevTools(
    applyMiddleware(request(http, '/api'), notification, promise.default)
);