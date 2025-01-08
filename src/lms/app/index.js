import { render } from 'react-dom';

import AppProvider from 'shared/components/app-provider';
import { theme } from 'shared/theme';
import 'shared/styles';

import { App } from './components';
import store from './store';

render(
    <AppProvider store={store} theme={theme}>
        <App />
    </AppProvider>,
    document.getElementById('root')
);