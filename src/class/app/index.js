import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';

import { ThemeProvider, theme } from 'shared/theme';

import './index.scss';

import store from './store';
import { AppStateProvider } from './contexts/AppStateContext';
import Root from './components';

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