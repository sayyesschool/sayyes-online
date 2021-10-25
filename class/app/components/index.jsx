import useAppState from 'app/hooks/useAppState';
import useConnectionOptions from 'app/hooks/useConnectionOptions';
import { RoomProvider } from 'app/contexts/RoomContext';
import App from 'app/components/App';
import ErrorDialog from 'app/components/ErrorDialog';
import UnsupportedBrowserWarning from 'app/components/UnsupportedBrowserWarning';

export default function Root() {
    const { error, setError } = useAppState();
    const connectionOptions = useConnectionOptions();

    return (
        <UnsupportedBrowserWarning>
            <RoomProvider options={connectionOptions} onError={setError}>
                <App />

                <ErrorDialog
                    error={error}
                    onClose={() => setError(null)}
                />
            </RoomProvider>
        </UnsupportedBrowserWarning>
    );
}