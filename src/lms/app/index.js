import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import ErrorBoundary from 'shared/components/error-boundary';
import { StoreProvider } from 'shared/store';
import { theme, ThemeProvider } from 'shared/theme';
import 'shared/styles';

import { App } from './components';
import store from './store';

render(
    <ErrorBoundary>
        <StoreProvider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    {/* // TODO: Стоит ли оставить провайдер тут или луше убрать его в lms? */}
                    <DndProvider backend={HTML5Backend}>
                        <App />
                    </DndProvider>
                </Router>
            </ThemeProvider>
        </StoreProvider>
    </ErrorBoundary>,
    document.getElementById('root')
);