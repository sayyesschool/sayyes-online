import { useCallback } from 'react';

import App from 'class/components/App';
import ErrorDialog from 'class/components/ErrorDialog';
import UnsupportedBrowserWarning from 'class/components/UnsupportedBrowserWarning';
import { RoomProvider } from 'class/contexts/RoomContext';
import useAppState from 'class/hooks/useAppState';

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