import { useCallback } from 'react';

import { RoomProvider } from 'app/contexts/RoomContext';
import useAppState from 'app/hooks/useAppState';
import App from 'app/components/App';
import ErrorDialog from 'app/components/ErrorDialog';
import UnsupportedBrowserWarning from 'app/components/UnsupportedBrowserWarning';

export default function Root() {
    const { error, setError } = useAppState();

    const handleError = useCallback(error => {
        console.log(`ERROR: ${error.message}`, error);
        setError(error);
    }, []);

    const handleClose = useCallback(() => {
        setError(null);
    }, []);

    return (
        <UnsupportedBrowserWarning>
            <RoomProvider onError={handleError}>
                <App />
            </RoomProvider>

            <ErrorDialog
                error={error}
                onClose={handleClose}
            />
        </UnsupportedBrowserWarning>
    );
}