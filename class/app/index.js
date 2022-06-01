import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as ThemeProvider } from '@fluentui/react-northstar';

import './index.scss';

import store from './store';
import theme from './theme';
import { AppStateProvider } from './contexts/AppStateContext';
import Root from './components';

render(
    <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
            <Router basename={`/class/${ENROLLMENT_ID}`}>
                <AppStateProvider>
                    <Root />
                </AppStateProvider>
            </Router>
        </ThemeProvider>
    </StoreProvider>,
    document.getElementById('root')
);