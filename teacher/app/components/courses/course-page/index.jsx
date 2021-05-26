import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import {
    Dialog,
    Icon
} from 'mdc-react';

import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';
import BottomSheet from 'shared/components/bottom-sheet';
import CourseContent from 'shared/components/course-content';
import UnitContent from 'shared/components/unit-content';
import LessonContent from 'shared/components/lesson-content';
import AudioPlayer from 'shared/components/audio-player';
import VideoPlayer from 'shared/components/video-player';
import MenuButton from 'shared/components/menu-button';

import './index.scss';

export default function CoursePage({ match }) {
    const [course] = useCourse(match.params.courseId);

    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unitId);
    const lesson = course.lessonsById.get(match.params.lessonId);

    return (
        <Page id="course-page">
            <PageTopBar
                title={lesson?.title || unit?.title || course?.title}
                breadcrumbs={[
                    (unit &&
                        <Link to={course.uri}>{course.title}</Link>
                    ),
                    (lesson &&
                        <Link to={unit.uri}>{unit.title}</Link>
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
                                    onClick: () => setAudio(audio)
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
                                    onClick: () => setVideo(video)
                                }))}
                            />
                        )
                    ]
                }
            />

            <PageContent>
                <Route exact path="*/courses/:courseId">
                    <CourseContent
                        course={course}
                    />
                </Route>

                <Route exact path="*/courses/:courseId/units/:unitId">
                    <UnitContent
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
        </Page>
    );
}