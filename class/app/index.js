import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.scss';

import store from './store';
import App from './components';

ReactDOM.render(
    <Provider store={store}>
        <Router basename="/class">
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);