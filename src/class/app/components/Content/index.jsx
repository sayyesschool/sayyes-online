import { createContext, useCallback, useRef, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { LocalAudioTrack, LocalVideoTrack } from 'twilio-video';

import Course from 'lms/components/courses/course-page';
import Unit from 'lms/components/courses/unit-page';
import Lesson from 'lms/components/courses/lesson-page';

import MediaContext from 'shared/contexts/media';
import AudioPlayer from 'shared/components/audio-player';
import BottomSheet from 'shared/components/bottom-sheet';
import CoursesGrid from 'shared/components/courses-grid';
import VideoPlayer from 'shared/components/video-player';
import { Button, Dialog } from 'shared/ui-components';

const Context = createContext();

import './index.scss';
import { useMemo } from 'react';

export default function ContentRouter({
    room,
    user,
    enrollment,
    sharedState,
    updateSharedState,
    onMediaStart,
    onMediaStop
}) {
    const videoPlayerRef = useRef();

    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);

    const handleAudioRef = useCallback((player) => {
        if (!player) return;

        const audio = player.media;
        let audioTrack;

        player?.once('play', () => {
            player.stop();

            const stream = audio.captureStream();
            const audioStream = stream.getAudioTracks()?.at(0);

            if (audioStream) {
                audioTrack = new LocalAudioTrack(audioStream);
                onMediaStart(audioTrack)
                    .then(() => {
                        player.play();
                    });
            }
        });

        player?.once('ended', () => {
            onMediaStop(audioTrack)
                .then(() => {
                    audioTrack = null;
                });
        });
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
            if (videoTrack)
                onMediaStop(videoTrack);

            if (audioTrack)
                onMediaStop(audioTrack);

            videoTrack = null;
            audioTrack = null;
        };
    }, [onMediaStart, onMediaStop]);

    const contextValue = useMemo(() => ({
        audioPlayerRef: handleAudioRef,
        videoPlayerRef,
        handleVideo
    }), [
        videoPlayerRef,
        handleAudioRef,
        handleVideo
    ]);

    return (
        <MediaContext.Provider value={contextValue}>
            <Switch>
                <Route exact path="/courses">
                    <div className="page">
                        <CoursesGrid courses={enrollment.courses} />
                    </div>
                </Route>
                <Route exact path="/courses/:course" component={Course} />
                <Route exact path="/courses/:course/units/:unit" component={Unit} />
                <Route exact path="/courses/:course/lessons/:lesson" component={Lesson} />
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
        </MediaContext.Provider>
    );
}