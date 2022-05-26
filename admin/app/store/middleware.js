import { applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import client from 'shared/services/api';
import api from 'shared/store/middleware/api';
import storage from 'shared/store/middleware/storage';
import notification from 'shared/store/middleware/notification';

export default composeWithDevTools(
    applyMiddleware(promise, storage, api(client, '/admin/api'), notification)
);