import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import ErrorBoundary from 'shared/components/error-boundary';
import { StoreProvider } from 'shared/store';
import { theme, ThemeProvider } from 'shared/theme';

import App from './components/App';

import routes from './routes';
import store from './store';

import './index.scss';

render(
    <ErrorBoundary>
        <StoreProvider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <App routes={routes} />
                </Router>
            </ThemeProvider>
        </StoreProvider>
    </ErrorBoundary>,
    document.getElementById('root')
);