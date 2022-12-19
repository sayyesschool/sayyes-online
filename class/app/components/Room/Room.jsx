import { useCallback, useEffect, useRef, useState } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import classnames from 'classnames';

import { useBoolean } from 'shared/hooks/state';
import { useFullScreen, useScrollClassName } from 'shared/hooks/screen';

import useRoomContext from 'app/hooks/useRoomContext';
import useSharedState from 'app/hooks/useSharedState';

import Chat from 'app/components/Chat';
import Courses from 'app/components/Courses';
import MainParticipant from 'app/components/MainParticipant';
import ParticipantAudioTracks from 'app/components/ParticipantAudioTracks';
import ParticipantList from 'app/components/ParticipantList';
import RoomHeader from 'app/components/RoomHeader';
import RoomContent from 'app/components/RoomContent';
import RoomSidePanel from 'app/components/RoomSidePanel';
import ScreenShareAlert from 'app/components/ScreenShareAlert';
import MiroWhiteboard from 'app/components/MiroWhiteboard';

export default function Room({ user, enrollment }) {
    const sharedState = useSharedState();
    const { room, participants, isSharingScreen, toggleScreenShare } = useRoomContext();
    const location = useLocation();
    const history = useHistory();

    const rootRef = useRef();
    const contentRef = useRef();

    const [isFullscreen, toggleFullscreen] = useFullScreen(rootRef);
    const [isChatOpen, toggleChatOpen] = useBoolean(false);
    const [numberOfUnreadMessages, setNumberOfUnreadMessages] = useState();

    useScrollClassName(contentRef, 'room-content--scrolling', []);

    useEffect(() => {
        const namesById = {
            [enrollment.client.id]: enrollment.client.fullname,
            [enrollment.teacher.id]: enrollment.teacher.fullname
        };

        room.localParticipant.name = namesById[user.id];

        participants.forEach(participant => {
            participant.name = namesById[participant.identity];
        });
    }, [participants]);

    useEffect(() => {
        if (isChatOpen) {
            setNumberOfUnreadMessages(undefined);
        }
    }, [isChatOpen]);

    useEffect(() => {
        if (!sharedState.data?.path) return;

        history.push(sharedState.data.path);
    }, [sharedState.data?.path]);

    const handleSync = useCallback(() => {
        sharedState.updateDoc({
            path: location.pathname + location.search
        });
    }, [location]);

    const handleChatConnected = useCallback(channel => {
        channel.getUnconsumedMessagesCount()
            .then(unconsumedMessagesCount => {
                setNumberOfUnreadMessages(unconsumedMessagesCount);
                channel.setAllMessagesConsumed();
            });
    }, []);

    const handleDisconnect = useCallback(() => {
        room.disconnect();
    }, [room]);

    return (
        <div ref={rootRef} className={classnames('room', {
            'room--fullscreen': isFullscreen,
            'room--showing-content': location.pathname !== '/'
        })}>
            <RoomHeader
                user={user}
                location={location}
                isChatOpen={isChatOpen}
                isSharingScreen={isSharingScreen}
                isFullscreen={isFullscreen}
                numberOfUnreadMessages={numberOfUnreadMessages}
                onChatToggle={toggleChatOpen}
                onFullscreenToggle={toggleFullscreen}
                onSync={handleSync}
                onDisconnect={handleDisconnect}
            />

            <RoomSidePanel
                title="Чат"
                open={isChatOpen}
                onClose={() => toggleChatOpen(false)}
            >
                <Chat
                    name={enrollment.id}
                    user={user}
                    onConnected={handleChatConnected}
                />
            </RoomSidePanel>

            <RoomContent ref={contentRef}>
                <ParticipantAudioTracks />
                <MainParticipant />
                <ParticipantList />

                <Switch>
                    <Route path="/courses">
                        <Courses
                            user={user}
                            enrollment={enrollment}
                        />
                    </Route>

                    <Route path="/whiteboard">
                        <MiroWhiteboard />
                    </Route>
                </Switch>
            </RoomContent>

            {isSharingScreen &&
                <ScreenShareAlert
                    onDisableSharing={toggleScreenShare}
                />
            }
        </div>
    );
}