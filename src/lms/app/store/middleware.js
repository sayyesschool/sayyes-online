import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import promise from 'redux-promise';

import http from 'shared/services/http';
import api from 'shared/store/middleware/api';
import notification from 'shared/store/middleware/notification';

export default composeWithDevTools(
    applyMiddleware(api(http, '/api'), notification, promise)
);