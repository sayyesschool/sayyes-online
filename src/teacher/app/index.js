import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';

import './index.scss';

import { ThemeProvider, theme } from 'shared/theme';

import store from './store';
import App from './components';

render(
    <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
            <Router basename="/teacher">
                <App />
            </Router>
        </ThemeProvider>
    </StoreProvider>,
    document.getElementById('root')
);