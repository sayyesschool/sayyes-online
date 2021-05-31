import React, { useCallback, useRef, useState } from 'react';
import { useLocation, Route, NavLink } from 'react-router-dom';
import {
    Icon,
    TabBar, Tab
} from 'mdc-react';
import classnames from 'classnames';

import { useFullScreen } from 'shared/hooks/screen';

import useLocalAudio from 'app/hooks/useLocalAudio';
import RoomHeader from 'app/components/RoomHeader';
import RoomContent from 'app/components/RoomContent';
import MainParticipant from 'app/components/MainParticipant';
import ParticipantList from 'app/components/ParticipantList';
import Course from 'app/components/course';

export default function Room({ courseId }) {
    const location = useLocation();
    const roomElementRef = useRef();
    const [isFullscreen, toggleFullscreen] = useFullScreen(roomElementRef);
    const [localAudio, setLocalAudioEnabled] = useLocalAudio();
    const [shouldBeUnmuted, setShouldBeUnmuted] = useState();
    const [tab, setTab] = useState(location.pathname.includes('courses') ? 'content' : 'video');

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

    return (
        <div ref={roomElementRef} className={classnames('room', {
            'room--showing-content': tab === 'content'
        })}>
            <RoomHeader
                isFullscreen={isFullscreen}
                handleFullscreen={toggleFullscreen}
            >
                <TabBar value={tab} minWidth align="center" onChange={setTab}>
                    <Tab
                        component={NavLink}
                        to="/"
                        value="video"
                        icon={<Icon>video_camera_front</Icon>}
                        label="Видео"
                    />

                    <Tab
                        component={NavLink}
                        to={`/courses/${courseId}`}
                        value="content"
                        icon={<Icon>book</Icon>}
                        label="Курс"
                    />
                </TabBar>
            </RoomHeader>

            <RoomContent>
                <Route exact path="/:id">
                    <MainParticipant />
                </Route>

                <Route
                    path={[
                        '/courses/:courseId/units/:unitId/lessons/:lessonId',
                        '/courses/:courseId/units/:unitId',
                        '/courses/:courseId'
                    ]}
                >
                    <Course onMedia={handleMedia} />
                </Route>

                <ParticipantList />
            </RoomContent>
        </div>
    );
}