import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import moment from 'moment';

moment.locale('ru');

import './index.scss';

import store from './store';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <Router basename="/admin">
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);