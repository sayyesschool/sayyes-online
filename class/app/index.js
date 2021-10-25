import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.scss';

import store from './store';
import { AppStateProvider } from './contexts/AppStateContext';
import { SharedStateProvider } from './contexts/SharedStateContext';
import Root from './components';

render(
    <Provider store={store}>
        <SharedStateProvider token={TWILIO_SYNC_TOKEN} docIc={ENROLLMENT_ID}>
            <AppStateProvider>
                <Router basename={`/class/${ENROLLMENT_ID}`}>
                    <Root />
                </Router>
            </AppStateProvider>
        </SharedStateProvider>
    </Provider>,
    document.getElementById('root')
);