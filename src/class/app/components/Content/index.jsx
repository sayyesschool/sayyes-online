import { useCallback, useRef, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LocalAudioTrack, LocalVideoTrack } from 'twilio-video';

import CoursesGrid from 'lms/components/courses/courses-grid';
import Course from 'lms/components/courses/course-page';
import Unit from 'lms/components/courses/unit-page';
import Lesson from 'lms/components/courses/lesson-page';
import Exercise from 'lms/components/courses/exercise-page';

import AudioPlayer from 'shared/components/audio-player';
import VideoPlayer from 'shared/components/video-player';
import BottomSheet from 'shared/components/bottom-sheet';
import { Button, Dialog } from 'shared/ui-components';

import './index.scss';

export default function ContentRouter({
    room,
    user,
    enrollment,
    sharedState,
    updateSharedState,
    onMediaStart,
    onMediaStop
}) {
    const audioPlayerRef = useRef();
    const videoPlayerRef = useRef();

    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);

    const handleAudio = useCallback(() => {
        const player = audioPlayerRef.current;
        const audio = player.media;

        let audioTrack;

        const stream = audio.captureStream();
        const audioStream = stream.getAudioTracks()?.at(0);

        if (audioStream) {
            audioTrack = new LocalAudioTrack(audioStream);
            onMediaStart(audioTrack)
                .then(() => {
                    player.play();
                });
        }

        audio.onended = () => {
            onMediaStop(audioTrack)
                .then(() => {
                    audioTrack = null;
                });
        };
    }, [onMediaStart, onMediaStop]);

    const handleVideo = useCallback(() => {
        const player = videoPlayerRef.current;
        const video = player.media;

        let videoTrack;
        let audioTrack;

        const stream = video.captureStream();
        const videoStream = stream.getVideoTracks()?.at(0);
        const audioStream = stream.getAudioTracks()?.at(0);

        if (videoStream) {
            videoTrack = new LocalVideoTrack(videoStream, { name: 'video' });
        }

        if (audioStream) {
            audioTrack = new LocalAudioTrack(audioStream, { name: 'audio' });
        }

        Promise.all([videoTrack, audioTrack]
            .filter(Boolean)
            .map(track => onMediaStart(track)))
            .then(() => {
                video.play();
            });

        video.onended = async () => {
            if (videoTrack) {
                onMediaStop(videoTrack)
                    .then(() => {
                        videoTrack = null;
                    });
            }

            if (audioTrack) {
                onMediaStop(audioTrack)
                    .then(() => {
                        audioTrack = null;
                    });
            }
        };
    }, [onMediaStart, onMediaStop]);

    return (
        <>
            <Switch>
                <Route exact path="/content/courses">
                    <div className="page">
                        <CoursesGrid courses={enrollment.courses} />
                    </div>
                </Route>
                <Route exact path="/content/courses/:course" component={Course} />
                <Route exact path="/content/courses/:course/units/:unit" component={Unit} />
                <Route exact path="/content/courses/:course/lessons/:lesson" component={Lesson} />
                <Route
                    exact
                    path="/content/courses/:course/exercises/:exercise"
                    render={props => (
                        <Exercise
                            {...props}
                            user={user}
                            enrollment={enrollment}
                            sharedState={sharedState}
                            updateSharedState={updateSharedState}
                        />
                    )}
                />
            </Switch>

            <div>
                <div>
                    <AudioPlayer
                        ref={audioPlayerRef}
                        src="https://storage.yandexcloud.net/sayyesonline/courses/625eaaa5f3af9753742e89a8/audios/b7a1478a-ec6b-41e9-818f-f200eff2fa5f.mp3"
                        crossOrigin="anonymous"
                    />
                    <Button
                        content="Play audio for everyone"
                        onClick={handleAudio}
                    />
                </div>

                <div>
                    <VideoPlayer
                        ref={videoPlayerRef}
                        src="https://storage.yandexcloud.net/sayyesonline/courses/625eaaa5f3af9753742e89a8/videos/ts1e1a1.mp4"
                        crossOrigin="anonymous"
                    />
                    <Button
                        content="Play video for everyone"
                        onClick={handleVideo}
                    />
                </div>
            </div>

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