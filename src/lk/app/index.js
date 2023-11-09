import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { CssVarsProvider as ThemeProvider } from '@mui/joy/styles';

import './index.scss';

import theme from 'shared/theme';

import store from './store';
import App from './components';

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