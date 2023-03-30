import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { CssVarsProvider as ThemeProvider } from '@mui/joy/styles';

import theme from 'shared/theme';

import store from './store';
import routes from './routes';
import App from './components/App';

import './index.scss';

render(
    <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
            <Router basename="/lms">
                <App routes={routes} />
            </Router>
        </ThemeProvider>
    </StoreProvider>,
    document.getElementById('root')
);