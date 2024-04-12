import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import promise from 'redux-promise';

import http from 'shared/services/http';
import api from 'shared/store/middleware/api';
import notification from 'shared/store/middleware/notification';
import storage from 'shared/store/middleware/storage';

export default composeWithDevTools(
    applyMiddleware(promise, storage, api(http, '/api'), notification)
);