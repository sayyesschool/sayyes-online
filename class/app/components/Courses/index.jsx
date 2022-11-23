import { useCallback, useRef, useState } from 'react';
import { Route, Link, useParams } from 'react-router-dom';

import { useUpdated } from 'shared/hooks/lifecycle';
import { useScrollClassName } from 'shared/hooks/screen';
import { useCourse } from 'shared/hooks/courses';
import { Dialog, Surface } from 'shared/ui-components';
import LoadingIndicator from 'shared/components/loading-indicator';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import BottomSheet from 'shared/components/bottom-sheet';
import CourseContent from 'shared/components/course-content';
import UnitContent from 'shared/components/unit-content';
import LessonContent from 'shared/components/lesson-content';
import AudioPlayer from 'shared/components/audio-player';
import VideoPlayer from 'shared/components/video-player';

import useLocalAudio from 'app/hooks/useLocalAudio';
import Canvas from 'app/components/Canvas';

import './index.scss';

export default function CoursesPage({ user, enrollment, sharedState, updateSharedState, onMedia }) {
    const params = useParams();

    const [localAudio, setLocalAudioEnabled] = useLocalAudio();

    const [course] = useCourse(params.courseId);

    const rootRef = useRef();

    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);
    const [shouldBeUnmuted, setShouldBeUnmuted] = useState();

    useScrollClassName(rootRef, 'course-page--scrolling', [course]);

    useUpdated(() => {
        if (sharedState?.audio) {
            setAudio(course.audiosByFilename.get(sharedState.audio));
        }

        if (sharedState?.video) {
            setVideo(course.videosByFilename.get(sharedState.video));
        }
    }, [course, sharedState]);

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
            />

            <PageContent>
                <Route exact path="/courses">
                    <CoursesGrid
                        courses={enrollment.courses}
                    />
                </Route>

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

                <Route exact path="/courses/:courseId/lessons/:lessonId">
                    {lesson?.image ?
                        <Surface>
                            <Canvas
                                type={user.role === 'teacher' ? 'local' : 'remote'}
                                imageSrc={lesson.imageUrl}
                            />
                        </Surface>
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
                content={video &&
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
                onClose={() => setVideo(null)}
            />
        </div>
    );
}