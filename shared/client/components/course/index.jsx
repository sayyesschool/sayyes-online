import React, { useCallback, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import {
    Dialog,
    Icon,
    IconButton
} from 'mdc-react';

import { useUpdated } from 'shared/hooks/lifecycle';
import { useSyncDoc } from 'shared/hooks/twilio/sync';
import { useUser } from 'shared/hooks/user';
import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import BottomSheet from 'shared/components/bottom-sheet';
import CourseContent from 'shared/components/course-content';
import UnitContent from 'shared/components/unit-content';
import LessonContent from 'shared/components/lesson-content';
import AudioPlayer from 'shared/components/audio-player';
import VideoPlayer from 'shared/components/video-player';
import MenuButton from 'shared/components/menu-button';

import './index.scss';

export default function Course({ match, location, history }) {
    const [sharedState, setSharedState] = useSyncDoc(window.TWILIO_SYNC_TOKEN, match.params.enrollmentId);
    const [course] = useCourse(match.params.courseId);

    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);

    useUpdated(() => {
        if (sharedState?.path) {
            history.push(sharedState?.path);
        }

        if (sharedState?.audio) {
            setAudio(course.audiosByFilename.get(sharedState.audio));
        }

        if (sharedState?.video) {
            setVideo(course.videosByFilename.get(sharedState.video));
        }

        setSharedState({});
    }, [course, sharedState]);

    const handleAudio = useCallback(audio => {
        setAudio(audio);
        setSharedState({
            audio: audio.filename,
            path: location.pathname
        });
    }, [location]);

    const handleVideo = useCallback(video => {
        setVideo(video);
        setSharedState({
            video: video.filename,
            path: location.pathname
        });
    }, [location]);

    const handleSync = useCallback(() => {
        setSharedState({
            path: location.pathname
        });
    }, [location]);

    if (!course) return <LoadingIndicator />;

    const enrollmentId = match.params.enrollmentId;
    const unit = course.unitsById.get(match.params.unitId);
    const lesson = course.lessonsById.get(match.params.lessonId);

    return (
        <div className="course">
            <PageHeader
                breadcrumbs={[
                    <Link to={`/${enrollmentId}/courses/${course.id}`}>{course.title}</Link>,
                    (unit &&
                        <Link to={`/${enrollmentId}/courses/${course.id}`}>{unit.title}</Link>
                    ),
                    (lesson &&
                        <Link to={`/${enrollmentId}/courses/${course.id}/units/${unit.id}`}>{lesson?.title}</Link>
                    )
                ].filter(v => !!v)}
                actions={
                    [
                        (lesson?.audios?.length > 0 &&
                            <MenuButton
                                key="audio"
                                icon="audiotrack"
                                listProps={{ twoLine: true }}
                                items={lesson.audios.map(audio => course.audiosByFilename.get(audio)).map(audio => ({
                                    key: audio.filename,
                                    graphic: <Icon>audiotrack</Icon>,
                                    primaryText: audio.title,
                                    secondaryText: audio.duration,
                                    onClick: () => handleAudio(audio)
                                }))}
                            />
                        ),
                        (lesson?.videos?.length > 0 &&
                            <MenuButton
                                key="video"
                                icon="movie"
                                listProps={{ twoLine: true }}
                                items={lesson.videos.map(video => course.videosByFilename.get(video)).map(video => ({
                                    key: video.filename,
                                    graphic: <Icon>movie</Icon>,
                                    primaryText: video.title,
                                    secondaryText: video.duration,
                                    onClick: () => handleVideo(video)
                                }))}
                            />
                        ),
                        <IconButton
                            key="sync"
                            icon="sync"
                            onClick={handleSync}
                        />
                    ]
                }
            />

            <PageContent>
                <Route exact path="*/courses/:courseId">
                    <CourseContent
                        enrollmentId={enrollmentId}
                        course={course}
                    />
                </Route>

                <Route exact path="*/courses/:courseId/units/:unitId">
                    <UnitContent
                        enrollmentId={enrollmentId}
                        course={course}
                        unit={unit}
                    />
                </Route>

                <Route exact path="*/courses/:courseId/units/:unitId/lessons/:lessonId">
                    <LessonContent
                        course={course}
                        unit={unit}
                        lesson={lesson}
                    />
                </Route>
            </PageContent>

            <BottomSheet
                open={!!audio}
                onClose={() => setAudio(null)}
            >
                {audio &&
                    <AudioPlayer
                        src={audio.url}
                        width="100%"
                        autoPlay
                    />
                }
            </BottomSheet>

            <Dialog
                open={!!video}
                onClose={() => setVideo(null)}
            >
                {video &&
                    <VideoPlayer
                        id="video-player"
                        title={video.title}
                        src={video.url}
                        provider="server"
                        width="100%"
                        controls
                        autoPlay
                    />
                }
            </Dialog>
        </div>
    );
}