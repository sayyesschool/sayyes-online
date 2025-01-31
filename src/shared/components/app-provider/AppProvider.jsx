import { BrowserRouter as Router } from 'react-router-dom';

import ErrorBoundary from 'shared/components/error-boundary';
import { StoreProvider } from 'shared/store';
import { ThemeProvider } from 'shared/theme';

export default function AppProvider({ store, theme, children }) {
    return (
        <ErrorBoundary>
            <StoreProvider store={store}>
                <Router>
                    <ThemeProvider theme={theme}>
                        {children}
                    </ThemeProvider>
                </Router>
            </StoreProvider>
        </ErrorBoundary>
    );
}