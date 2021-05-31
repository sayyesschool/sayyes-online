import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.scss';

import store from './store';
import { AppStateProvider } from './contexts/AppStateContext';
import Root from './components';

ReactDOM.render(
    <Provider store={store}>
        <AppStateProvider>
            <Router basename={`/class/${ENROLLMENT_ID}`}>
                <Root />
            </Router>
        </AppStateProvider>
    </Provider>,
    document.getElementById('root')
);