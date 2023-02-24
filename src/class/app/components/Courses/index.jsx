import { useCallback, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { useUpdated } from 'shared/hooks/lifecycle';
import { Dialog } from 'shared/ui-components';
import CoursesGrid from 'shared/components/courses-grid';
import Course from 'shared/components/course-page';
import Unit from 'shared/components/unit-page';
import Lesson from 'shared/components/lesson-page';
import Exercise from 'shared/components/exercise-page';
import AudioPlayer from 'shared/components/audio-player';
import VideoPlayer from 'shared/components/video-player';
import BottomSheet from 'shared/components/bottom-sheet';

import useLocalAudio from 'app/hooks/useLocalAudio';

import './index.scss';

export default function CourseRouter({ user, enrollment, sharedState, updateSharedState, onMedia }) {
    const [localAudio, setLocalAudioEnabled] = useLocalAudio();

    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);
    const [shouldBeUnmuted, setShouldBeUnmuted] = useState();

    useUpdated(() => {
        if (sharedState?.audio) {
            setAudio(course.audiosByFilename.get(sharedState.audio));
        }

        if (sharedState?.video) {
            setVideo(course.videosByFilename.get(sharedState.video));
        }
    }, [sharedState]);

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

    return (
        <>
            <Switch>
                <Route exact path="/courses">
                    <div className="page">
                        <CoursesGrid courses={enrollment.courses} />
                    </div>
                </Route>
                <Route exact path="/courses/:course" component={Course} />
                <Route exact path="/courses/:course/units/:unit" component={Unit} />
                <Route exact path="/courses/:course/lessons/:lesson" component={Lesson} />
                <Route exact path="/courses/:course/exercises/:exercise" component={Exercise} />
            </Switch>

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
        </>
    );
}