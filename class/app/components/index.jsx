import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Icon, FAB } from 'mdc-react';

import { useSync } from 'shared/hooks/twilio/sync';
import { useUser } from 'shared/hooks/user';
import { useEnrollment } from 'shared/hooks/enrollments';
import LoadingIndicator from 'shared/components/loading-indicator';
import AppHeader from 'shared/components/app-header';
import AppContent from 'shared/components/app-content';
import PageSideSheet from 'shared/components/page-side-sheet';
import Chat from 'shared/components/chat';
import Course from 'shared/components/course';

import Room from 'app/components/room';

import './index.scss';

export default function App() {
    const match = useRouteMatch('/:id');
    //const syncClientRef = useSync(user.id);
    const [user] = useUser();
    const [enrollment] = useEnrollment(match.params.id);

    const [document, setDocument] = useState();
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
        <div className="class">
            <AppHeader
                user={user}
            />

            <PageSideSheet
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
            </PageSideSheet>

            <AppContent className="class-content">
                <Room
                    name={enrollment.id}
                    localParticipant={user}
                    remoteParticipant={user.role === 'teacher' ? enrollment.client : enrollment.teacher}
                >
                    <Switch>
                        <Route exact path="/:enrollmentId/course/:courseId" component={Course} />
                        {/* <Route exact path="/:enrollmentId/materials/:materialId" component={Material} /> */}
                    </Switch>
                </Room>
            </AppContent>

            <FAB
                className="chat-button"
                icon={<Icon>forum</Icon>}
                label="Чат"
                exited={isChatOpen}
                onClick={() => setChatOpen(true)}
            />
        </div>
    );
}