import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.scss';

import store from './store';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <Router basename="/teacher">
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);