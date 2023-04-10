import { useUser } from 'shared/hooks/user';
import { useEnrollment } from 'shared/hooks/enrollments';
import LoadingIndicator from 'shared/components/loading-indicator';

import { SharedStateProvider } from 'app/contexts/SharedStateContext';
import useRoomState from 'app/hooks/useRoomState';
import useVisibilityHandler from 'app/hooks/useVisibilityHandler';
import Lobby from 'app/components/Lobby';
import Room from 'app/components/Room';
import ReconnectingAlert from 'app/components/ReconnectingAlert';

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
        </div>
    );
}