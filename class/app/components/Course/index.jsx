import React, { useCallback, useRef, useState } from 'react';
import { Route, Link, useParams } from 'react-router-dom';
import {
    Card,
    Dialog,
    Icon
} from 'mdc-react';

import { useUpdated } from 'shared/hooks/lifecycle';
import { useScrollClassName } from 'shared/hooks/screen';
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

import Canvas from 'app/components/Canvas';

import './index.scss';

export default function CoursePage({ user, sharedState, updateSharedState, onMedia }) {
    const params = useParams();

    const [course] = useCourse(params.courseId);
    const rootRef = useRef();

    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);

    useScrollClassName(rootRef, 'course-page--scrolling', [course]);

    useUpdated(() => {
        if (sharedState?.audio) {
            setAudio(course.audiosByFilename.get(sharedState.audio));
        }

        if (sharedState?.video) {
            setVideo(course.videosByFilename.get(sharedState.video));
        }
    }, [course, sharedState]);

    const handleAudio = useCallback(audio => {
        setAudio(audio);

        if (user.role === 'teacher') {
            updateSharedState({
                audio: audio.filename
            });
        }

        onMedia(audio);
    }, [user, onMedia]);

    const handleVideo = useCallback(video => {
        setVideo(video);

        if (user.role === 'teacher') {
            updateSharedState({
                video: video.filename
            });
        }

        onMedia(video);
    }, [user]);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(params.unitId);
    const lesson = course.lessonsById.get(params.lessonId);

    return (
        <div ref={rootRef} className="course-page">
            <PageHeader
                breadcrumbs={[
                    (unit &&
                        <Link to={`/courses/${course.id}`}>{course.title}</Link>
                    ),
                    (lesson &&
                        <Link to={`/courses/${course.id}`}>{unit.title}</Link>
                    )
                ].filter(v => !!v)}
                title={lesson?.title || unit?.title || course.title}
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
                        )
                    ]
                }
            />

            <PageContent>
                <Route exact path="/courses/:courseId">
                    <CourseContent
                        course={course}
                    />
                </Route>

                <Route exact path="/courses/:courseId/units/:unitId">
                    <UnitContent
                        course={course}
                        unit={unit}
                    />
                </Route>

                <Route exact path="/courses/:courseId/units/:unitId/lessons/:lessonId">
                    {lesson?.image ?
                        <Card>
                            <Canvas
                                type={user.role === 'teacher' ? 'local' : 'remote'}
                                imageSrc={lesson.imageUrl}
                            />
                        </Card>
                        :
                        <LessonContent
                            course={course}
                            unit={unit}
                            lesson={lesson}
                        />
                    }
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