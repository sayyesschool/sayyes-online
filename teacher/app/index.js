import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as ThemeProvider } from '@fluentui/react-northstar';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

import './index.scss';

import store from './store';
import theme from './theme';
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