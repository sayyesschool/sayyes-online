import { useUser } from 'shared/hooks/user';
import { useEnrollment } from 'shared/hooks/enrollments';
import LoadingIndicator from 'shared/components/loading-indicator';

import useRoomState from 'app/hooks/useRoomState';
import useVisibilityHandler from 'app/hooks/useVisibilityHandler';
import Lobby from 'app/components/Lobby';
import Room from 'app/components/Room';
import ReconnectingNotification from 'app/components/ReconnectingNotification';

import './index.scss';

export default function App() {
    const roomState = useRoomState();
    const [user] = useUser();
    const [enrollment] = useEnrollment(ENROLLMENT_ID);

    useVisibilityHandler();

    if (!user || !enrollment) return <LoadingIndicator />;

    return (
        <div id="app">
            {roomState === 'disconnected' ?
                <Lobby
                    user={user}
                />
                :
                <Room
                    user={user}
                    enrollment={enrollment}
                />
            }

            <ReconnectingNotification />
        </div>
    );
}