import { applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import http from 'shared/services/http';
import api from 'shared/store/middleware/api';
import storage from 'shared/store/middleware/storage';
import notification from 'shared/store/middleware/notification';

export default composeWithDevTools(
    applyMiddleware(promise, storage, api(http, '/api'), notification)
);