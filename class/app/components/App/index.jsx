import React, { useState } from 'react';
import { Icon, FAB } from 'mdc-react';

import { useUser } from 'shared/hooks/user';
import { useEnrollment } from 'shared/hooks/enrollments';
import LoadingIndicator from 'shared/components/loading-indicator';

import AppContent from 'shared/components/app-content';
import AppSideSheet from 'shared/components/app-side-sheet';
import Chat from 'shared/components/chat';

import useHeight from 'app/hooks/useHeight';
import useRoomState from 'app/hooks/useRoomState';
import useVisibilityHandler from 'app/hooks/useVisibilityHandler';
import Lobby from 'app/components/Lobby';
import Room from 'app/components/Room';
import ReconnectingNotification from 'app/components/ReconnectingNotification';

import './index.scss';

export default function App() {
    const roomState = useRoomState();
    const height = useHeight();
    const [user] = useUser();
    const [enrollment] = useEnrollment(ENROLLMENT_ID);
    useVisibilityHandler();

    const [isChatOpen, setChatOpen] = useState(false);

    if (!user || !enrollment) return <LoadingIndicator />;

    return (
        <div id="app" style={{ height }}>
            {roomState === 'disconnected' ?
                <Lobby />
                :
                <>
                    <AppSideSheet
                        title="Чат"
                        open={isChatOpen}
                        className="class-side-sheet"
                        appContentSelector=".class-content"
                        onClose={() => setChatOpen(false)}
                    >
                        <Chat
                            name={enrollment.id}
                            user={user}
                        />
                    </AppSideSheet>

                    <AppContent className="class-content">
                        <Room
                            courseId={enrollment.courses[0].id}
                        />

                        <FAB
                            className="chat-button"
                            icon={<Icon>forum</Icon>}
                            label="Чат"
                            exited={isChatOpen}
                            onClick={() => setChatOpen(true)}
                        />
                    </AppContent>
                </>
            }

            <ReconnectingNotification />
        </div>
    );
}