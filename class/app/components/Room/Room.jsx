import React, { useRef, useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import {
    Icon,
    TabBar, Tab
} from 'mdc-react';

import { useFullScreen } from 'shared/hooks/screen';
import Course from 'shared/components/course';

import RoomHeader from 'app/components/RoomHeader';
import RoomContent from 'app/components/RoomContent';
import MainParticipant from 'app/components/MainParticipant';
import ParticipantList from 'app/components/ParticipantList';

export default function Room({ enrollmentId, courseId }) {
    const roomElementRef = useRef();
    const [isFullscreen, toggleFullscreen] = useFullScreen(roomElementRef);
    const [tab, setTab] = useState(0);

    return (
        <div ref={roomElementRef} className="room">
            <RoomHeader
                isFullscreen={isFullscreen}
                handleFullscreen={toggleFullscreen}
            >
                <TabBar value={tab} minWidth align="center" onChange={setTab}>
                    <Tab
                        component={NavLink}
                        to={`/${enrollmentId}`}
                        icon={<Icon>video_camera_front</Icon>}
                        label="Видео"
                    />

                    <Tab
                        component={NavLink}
                        to={`/${enrollmentId}/courses/${courseId}`}
                        icon={<Icon>book</Icon>}
                        label="Курс"
                    />
                </TabBar>
            </RoomHeader>

            <RoomContent>
                <Route exact path="/:id">
                    <MainParticipant />
                </Route>

                <Route path={[
                    '/:enrollmentId/courses/:courseId/units/:unitId/lessons/:lessonId',
                    '/:enrollmentId/courses/:courseId/units/:unitId',
                    '/:enrollmentId/courses/:courseId'
                ]} component={Course} />
                <ParticipantList />
            </RoomContent>
        </div>
    );
}