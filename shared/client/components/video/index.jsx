import React, { useState, useEffect, useCallback } from 'react';
import {
    Card, CardMedia,
    Icon,
    IconButton
} from 'mdc-react';

import { useVideo } from 'shared/hooks/twilio';

import './index.scss';

export default function Video({ token, lesson, user, audio = true, video = true }) {
    const [isVideoOn, setVideoOn] = useState(video);
    const [isAudioOn, setAudioOn] = useState(audio);
    const { room, localMediaRef, remoteMediaRef } = useVideo(token, {
        name: lesson?.id,
        audio,
        video
    });

    const handleToggleVideo = useCallback(() => {
        setVideoOn(on => {
            if (on) {
                room.muteVideo();
                return false;
            } else {
                room.unmuteVideo();
                return true;
            }
        });
    }, [room]);

    const handleToggleAudio = useCallback(() => {
        setAudioOn(on => {
            if (on) {
                room.muteAudio();
                return false;
            } else {
                room.unmuteAudio();
                return true;
            }
        });
    }, []);

    return (
        <Card id="lesson-video">
            <Card.Header
                title="Видео"
                actions={[
                    <IconButton
                        on={isAudioOn}
                        onIcon={<Icon>mic</Icon>}
                        offIcon={<Icon>mic_off</Icon>}
                        onClick={handleToggleAudio}
                    />,

                    <IconButton
                        on={isVideoOn}
                        onIcon={<Icon>videocam</Icon>}
                        offIcon={<Icon>videocam_off</Icon>}
                        onClick={handleToggleVideo}
                    />
                ]}
            />

            <CardMedia wide>
                <video ref={localMediaRef} className="media media--local" />

                <video ref={remoteMediaRef} className="media media--remote" />
            </CardMedia>
        </Card>
    );
}