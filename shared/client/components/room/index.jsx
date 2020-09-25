import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    Icon,
    IconButton
} from 'mdc-react';

import { useRoom } from 'shared/hooks/twilio';
import VideoPreviewDialog from 'shared/components/video-preview-dialog';

import './index.scss';

export default function Room({ identity, name, video = true, audio = true }) {
    const localMediaRef = useRef();
    const remoteMediaRef = useRef();
    const [token, setToken] = useState();
    const [isVideoOn, setVideoOn] = useState(video);
    const [isAudioOn, setAudioOn] = useState(audio);
    const [isPreviewOpen, setPreviewOpen] = useState(true);
    // const { room } = useRoom(token, {
    //     name,
    //     audio: true,
    //     video: {
    //         width: 640
    //     },
    //     localMediaRef,
    //     remoteMediaRef
    // });

    // useEffect(() => {
    //     if (!token) {
    //         fetch(`/api/twilio/tokens/video?identity=${identity}&room=${name}`)
    //             .then(res => res.json())
    //             .then(res => setToken(res.data.token));
    //     }
    // }, [token]);

    const handleToggleVideo = useCallback(() => {
        // setVideoOn(on => {
        //     if (on) {
        //         room.muteVideo();
        //         return false;
        //     } else {
        //         room.unmuteVideo();
        //         return true;
        //     }
        // });
    }, []);

    const handleToggleAudio = useCallback(() => {
        // setAudioOn(on => {
        //     if (on) {
        //         room.muteAudio();
        //         return false;
        //     } else {
        //         room.unmuteAudio();
        //         return true;
        //     }
        // });
    }, []);

    // if (isPreviewOpen) return (
    //     <VideoPreviewDialog
    //         appear
    //         open={isPreviewOpen}
    //         onClose={() => setPreviewOpen(false)}
    //     />
    // );

    const room = undefined;

    return (
        <article className="room">
            <video ref={localMediaRef} className="media media--local" />
            <video ref={remoteMediaRef} className="media media--remote" />

            <div>
                <IconButton
                    icon={!!room ? 'call_end' : 'call'}
                />

                <IconButton
                    on={isAudioOn}
                    onIcon={<Icon>mic</Icon>}
                    offIcon={<Icon>mic_off</Icon>}
                    onClick={handleToggleAudio}
                />

                <IconButton
                    on={isVideoOn}
                    onIcon={<Icon>videocam</Icon>}
                    offIcon={<Icon>videocam_off</Icon>}
                    onClick={handleToggleVideo}
                />
            </div>
        </article>
    );
}