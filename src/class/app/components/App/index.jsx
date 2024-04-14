import AppNotification from 'shared/components/app-notification';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useEnrollment } from 'shared/hooks/enrollments';
import { useUser } from 'shared/hooks/user';

import Lobby from 'class/components/Lobby';
import ReconnectingAlert from 'class/components/ReconnectingAlert';
import Room from 'class/components/Room';
import { SharedStateProvider } from 'class/contexts/SharedStateContext';
import useRoomState from 'class/hooks/useRoomState';
import useVisibilityHandler from 'class/hooks/useVisibilityHandler';

import './index.scss';

export default function App() {
    const [user] = useUser();
    const [enrollment] = useEnrollment(ENROLLMENT_ID);
    const roomState = useRoomState();

    useVisibilityHandler();

    if (!user || !enrollment) return <LoadingIndicator fluid />;

    return (
        <div className="App">
            {roomState === 'disconnected' ?
                <Lobby
                    user={user}
                />
                :
                <SharedStateProvider token={TWILIO_SYNC_TOKEN} docId={ENROLLMENT_ID}>
                    <Room
                        user={user}
                        enrollment={enrollment}
                    />
                </SharedStateProvider>
            }

            {roomState === 'reconnecting' &&
                <ReconnectingAlert />
            }

            <AppNotification />
        </div>
    );
}