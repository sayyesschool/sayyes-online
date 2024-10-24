import { render } from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { CssVarsProvider as ThemeProvider } from '@mui/joy/styles';

import theme from 'shared/theme';

import App from './components';
import store from './store';

import './index.scss';

render(
    <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </StoreProvider>,
    document.getElementById('root')
);