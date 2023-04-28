import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import ErrorBoundary from 'shared/components/error-boundary';
import { StoreProvider } from 'shared/store';
import { ThemeProvider, theme } from 'shared/theme';

import store from './store';
import App from './components';

import './index.scss';

render(
    <ErrorBoundary>
        <StoreProvider store={store}>
            <ThemeProvider theme={theme}>
                <Router basename="/lms">
                    <App />
                </Router>
            </ThemeProvider>
        </StoreProvider>
    </ErrorBoundary>,
    document.getElementById('root')
);