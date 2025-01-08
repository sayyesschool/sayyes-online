/*global ENROLLMENT_ID*/

import { render } from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { theme, ThemeProvider } from 'shared/theme';

import { AppStateProvider } from './contexts/AppStateContext';
import Root from './components';
import store from './store';

import './index.scss';

render(
    <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
            <Router basename={`/${ENROLLMENT_ID}`}>
                <AppStateProvider>
                    <Root />
                </AppStateProvider>
            </Router>
        </ThemeProvider>
    </StoreProvider>,
    document.getElementById('root')
);