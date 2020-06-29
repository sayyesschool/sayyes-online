import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import { initializeIcons, loadTheme } from '@fluentui/react';

moment.locale('ru');

import './index.scss';

import store from './store';
import App from './App';

initializeIcons();
loadTheme({
    palette: {
        themePrimary: '#6c167b',
        themeLighterAlt: '#f8f2fa',
        themeLighter: '#e5cbea',
        themeLight: '#cfa2d7',
        themeTertiary: '#a259af',
        themeSecondary: '#7b278a',
        themeDarkAlt: '#61146e',
        themeDark: '#52115d',
        themeDarker: '#3c0c45',
        neutralLighterAlt: '#faf9f8',
        neutralLighter: '#f3f2f1',
        neutralLight: '#edebe9',
        neutralQuaternaryAlt: '#e1dfdd',
        neutralQuaternary: '#d0d0d0',
        neutralTertiaryAlt: '#c8c6c4',
        neutralTertiary: '#a19f9d',
        neutralSecondary: '#605e5c',
        neutralPrimaryAlt: '#3b3a39',
        neutralPrimary: '#323130',
        neutralDark: '#201f1e',
        black: '#000000',
        white: '#ffffff'
    }
});

ReactDOM.render(
    <Provider store={store}>
        <Router basename="/admin">
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);