import React, { useRef, useState } from 'react';
import { useLocation, Route, NavLink } from 'react-router-dom';
import {
    Icon,
    TabBar, Tab
} from 'mdc-react';
import classnames from 'classnames';

import { useFullScreen } from 'shared/hooks/screen';
import Course from 'shared/components/course';

import RoomHeader from 'app/components/RoomHeader';
import RoomContent from 'app/components/RoomContent';
import MainParticipant from 'app/components/MainParticipant';
import ParticipantList from 'app/components/ParticipantList';

export default function Room({ enrollmentId, courseId }) {
    const location = useLocation();
    const roomElementRef = useRef();
    const [isFullscreen, toggleFullscreen] = useFullScreen(roomElementRef);
    const [tab, setTab] = useState(location.pathname.includes('courses') ? 'content' : 'video');

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
                        to={`/${enrollmentId}`}
                        value="video"
                        icon={<Icon>video_camera_front</Icon>}
                        label="Видео"
                    />

                    <Tab
                        component={NavLink}
                        to={`/${enrollmentId}/courses/${courseId}`}
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