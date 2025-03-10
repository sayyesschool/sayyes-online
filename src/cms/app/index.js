import { render } from 'react-dom';

import AppProvider from 'shared/components/app-provider';
import { newTheme } from 'shared/theme';

import { App } from './components';
import routes from './routes';
import store from './store';

import './index.scss';

render(
    <AppProvider store={store} theme={newTheme}>
        <App routes={routes} />
    </AppProvider>,
    document.getElementById('root')
);