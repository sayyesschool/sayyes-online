import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
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
    const match = useRouteMatch('/:id');
    const [user] = useUser();
    const [enrollment] = useEnrollment(match.params.id);
    useVisibilityHandler();

    const [isChatOpen, setChatOpen] = useState(false);

    // useEffect(() => {
    //     if (enrollment) {
    //         syncClientRef.current?.document(enrollment.id).then(document => {
    //             document.on('updated', update => {
    //                 if (update.isLocal) return;

    //                 setDocument(update.value);
    //             });

    //             setDocument(document);
    //         });
    //     }

    //     return () => document?.close();
    // }, [enrollment]);

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
                        <Room />

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