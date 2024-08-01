import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import Chat from 'shared/components/chat';
import { useFullScreen, useScrollClassName } from 'shared/hooks/screen';
import { useBoolean } from 'shared/hooks/state';
import { Alert, Icon } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

import Content from 'class/components/Content';
import MainParticipant from 'class/components/MainParticipant';
import MiroWhiteboard from 'class/components/MiroWhiteboard';
import ParticipantAudioTracks from 'class/components/ParticipantAudioTracks';
import ParticipantList from 'class/components/ParticipantList';
import RoomContent from 'class/components/RoomContent';
import RoomHeader from 'class/components/RoomHeader';
import RoomSidePanel from 'class/components/RoomSidePanel';
import ScreenShareAlert from 'class/components/ScreenShareAlert';
import useRoomContext from 'class/hooks/useRoomContext';
import useSharedState from 'class/hooks/useSharedState';

export default function Room({ user, enrollment }) {
    const {
        room,
        localParticipant,
        participants,
        isSharingScreen,
        toggleScreenShare
    } = useRoomContext();
    const sharedState = useSharedState();
    const location = useLocation();
    const history = useHistory();

    const rootRef = useRef();
    const contentRef = useRef();

    const participantsById = useMemo(() => ({
        [enrollment.learner.id]: enrollment.learner.fullname,
        [enrollment.teacher.id]: enrollment.teacher.fullname
    }));

    const [isFullscreen, toggleFullscreen] = useFullScreen(rootRef);
    const [isChatOpen, toggleChatOpen] = useBoolean(false);
    const [isBroadcastingMedia, toggleBroadcastingMedia] = useBoolean(false);
    const [numberOfUnreadMessages, setNumberOfUnreadMessages] = useState(0);

    useScrollClassName(contentRef, 'RoomContent--scrolling', []);

    useEffect(() => {
        const namesById = {
            [enrollment.learner.id]: enrollment.learner.fullname,
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

    const handleChatJoined = useCallback(data => {
        setNumberOfUnreadMessages(data.unreadMessagesCount);
    }, []);

    const handleSync = useCallback(() => {
        sharedState.updateDoc({
            path: location.pathname + location.search
        });
    }, [location]);

    const handleMediaStart = useCallback(track => {
        if (!track) return;

        return localParticipant.publishTrack(track)
            .then(() => {
                toggleBroadcastingMedia(true);
            });
    }, [localParticipant]);

    const handleMediaStop = useCallback(track => {
        if (!track) return;

        localParticipant.unpublishTrack(track);
        toggleBroadcastingMedia(false);
    }, [localParticipant]);

    const handleDisconnect = useCallback(() => {
        room.disconnect();
    }, [room]);

    return (
        <div
            ref={rootRef} className={classnames('Room', {
                'Room--fullscreen': isFullscreen,
                'Room--showing-content': location.pathname !== '/'
            })}
        >
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
                    conversationId={enrollment.id}
                    userId={user.id}
                    participantsById={participantsById}
                    onJoined={handleChatJoined}
                />
            </RoomSidePanel>

            <RoomContent ref={contentRef}>
                {/*
                    This ParticipantAudioTracks component will render the audio track for all participants in the room.
                    It is in a separate component so that the audio tracks will always be rendered, and that they will never be
                    unnecessarily unmounted/mounted as the user switches between Gallery View and speaker View.
                */}
                <ParticipantAudioTracks />
                <MainParticipant />
                <ParticipantList />

                <Switch>
                    <Route path="/courses">
                        <Content
                            user={user}
                            enrollment={enrollment}
                            room={room}
                            onMediaStart={handleMediaStart}
                            onMediaStop={handleMediaStop}
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

            {isBroadcastingMedia &&
                <Alert
                    start={<Icon name="cast" />}
                    color="warning"
                    content="Вы транслируете медиа для всех участников"
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        borderRadius: 0
                    }}
                />
            }
        </div>
    );
}