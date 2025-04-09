import { render } from 'react-dom';

import AppProvider from 'shared/components/app-provider';
import { newTheme } from 'shared/theme';
import 'shared/styles';

import { App } from './components';
import store from './store';

render(
    <AppProvider store={store} theme={newTheme}>
        <App />
    </AppProvider>,
    document.getElementById('root')
);