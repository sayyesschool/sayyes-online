import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, Route } from 'react-router-dom';
import {
    Icon,
    FAB
} from 'mdc-react';
import classnames from 'classnames';

import { useFullScreen } from 'shared/hooks/screen';

import useRoomContext from 'app/hooks/useRoomContext';
import useSharedState from 'app/hooks/useSharedState';
import useLocalAudio from 'app/hooks/useLocalAudio';
import useParticipants from 'app/hooks/useParticipants';

import RoomHeader from 'app/components/RoomHeader';
import RoomContent from 'app/components/RoomContent';
import RoomSideSheet from 'app/components/RoomSideSheet';
import ScreenShareBanner from 'app/components/ScreenShareBanner';
import Chat from 'shared/components/chat';
import MainParticipant from 'app/components/MainParticipant';
import ParticipantList from 'app/components/ParticipantList';
import Courses from 'app/components/Courses';
import Course from 'app/components/Course';
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
    const [isChatOpen, setChatOpen] = useState(false);

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
                isSharingScreen={isSharingScreen}
                isFullscreen={isFullscreen}
                onFullscreen={toggleFullscreen}
                onSync={handleSync}
                onDisconnect={handleDisconnect}
            />

            <ScreenShareBanner
                open={isSharingScreen}
                onDisableSharing={toggleScreenShare}
            />

            <RoomSideSheet
                open={isChatOpen}
                onClose={() => setChatOpen(false)}
            >
                <Chat
                    name={enrollment.id}
                    user={user}
                />
            </RoomSideSheet>

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