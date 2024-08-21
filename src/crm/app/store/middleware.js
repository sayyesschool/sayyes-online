import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import promise from 'redux-promise';

import http from 'shared/services/http';
import notification from 'shared/store/middleware/notification';
import request from 'shared/store/middleware/request';
import storage from 'shared/store/middleware/storage';

export default composeWithDevTools(
    applyMiddleware(promise.default, storage, request(http, '/api'), notification)
);