import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, Route } from 'react-router-dom';
import classnames from 'classnames';

import { useBoolean } from 'shared/hooks/state';
import { useFullScreen } from 'shared/hooks/screen';

import useRoomContext from 'app/hooks/useRoomContext';
import useSharedState from 'app/hooks/useSharedState';
import useLocalAudio from 'app/hooks/useLocalAudio';
import useParticipants from 'app/hooks/useParticipants';

import Chat from 'app/components/Chat';
import Course from 'app/components/Course';
import Courses from 'app/components/Courses';
import MainParticipant from 'app/components/MainParticipant';
import ParticipantList from 'app/components/ParticipantList';
import RoomHeader from 'app/components/RoomHeader';
import RoomContent from 'app/components/RoomContent';
import RoomSidePanel from 'app/components/RoomSidePanel';
import ScreenShareAlert from 'app/components/ScreenShareAlert';
import Whiteboard from 'app/components/Whiteboard';

export default function Room({ user, enrollment }) {
    const rootRef = useRef();
    const location = useLocation();
    const sharedState = useSharedState();
    const participants = useParticipants();
    const { room, isSharingScreen, toggleScreenShare } = useRoomContext();
    const [localAudio, setLocalAudioEnabled] = useLocalAudio();
    const [isFullscreen, toggleFullscreen] = useFullScreen(rootRef);
    const [shouldBeUnmuted, setShouldBeUnmuted] = useState();
    const [isChatOpen, toggleChatOpen] = useBoolean(false);
    const [numberOfUnreadMessages, setNumberOfUnreadMessages] = useState();

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

    const handleSync = useCallback(() => {
        sharedState.update({
            path: location.pathname
        });
    }, [location]);

    const handleMedia = useCallback(media => {
        if (!localAudio) return;

        if (media) {
            if (localAudio.isEnabled) {
                setLocalAudioEnabled(false);
                setShouldBeUnmuted(true);
            }
        } else {
            if (!localAudio.isEnabled && shouldBeUnmuted) {
                setLocalAudioEnabled(true);
                setShouldBeUnmuted(false);
            }
        }
    }, [localAudio, shouldBeUnmuted]);

    const handleChatConnected = useCallback(channel => {
        channel.getUnconsumedMessagesCount()
            .then(unconsumedMessagesCount => {
                setNumberOfUnreadMessages(unconsumedMessagesCount);
                channel.setAllMessagesConsumed();
            });
    }, []);

    const handleDisconnect = useCallback(() => {
        room.disconnect();
    }, []);

    return (
        <div ref={rootRef} className={classnames('room', {
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
                onFullscreen={toggleFullscreen}
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

            <RoomContent>
                <Route exact path="/">
                    <MainParticipant />
                </Route>

                <Route exact path="/courses">
                    <Courses
                        courses={enrollment.courses}
                    />
                </Route>

                <Route
                    path={[
                        '/courses/:courseId/units/:unitId/lessons/:lessonId',
                        '/courses/:courseId/units/:unitId',
                        '/courses/:courseId'
                    ]}
                >
                    <Course
                        user={user}
                        sharedState={sharedState}
                        onMedia={handleMedia}
                    />
                </Route>

                <Route path="/whiteboard">
                    <Whiteboard />
                </Route>

                <ParticipantList />
            </RoomContent>

            {isSharingScreen &&
                <ScreenShareAlert
                    onDisableSharing={toggleScreenShare}
                />
            }
        </div>
    );
}