import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
    Avatar,
    IconButton,
    Typography
} from 'mdc-react';
import classnames from 'classnames';

import { useRoom } from 'shared/hooks/twilio';
import Chat from 'shared/components/chat';

import './index.scss';

export default function Conversation({ name, localParticipant, remoteParticipant }) {
    const rootRef = useRef();
    const localMediaRef = useRef();
    const remoteMediaRef = useRef();
    const [isFullscreen, setFullscreen] = useState(false);
    const room = useRoom(window.TWILIO_VIDEO_TOKEN, {
        localMediaRef,
        remoteMediaRef
    });

    useEffect(() => {
        if (isFullscreen) {
            rootRef.current.requestFullscreen();
        } else if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }, [isFullscreen]);

    const handleAudioCall = useCallback(() => {
        room.connect({ name, video: false });
    }, [name]);

    const handleVideoCall = useCallback(() => {
        room.connect({ name });
    }, [name]);

    const handleEndCall = useCallback(() => {
        room.disconnect();
        setFullscreen(false);
    }, []);

    const handleFullscreen = useCallback(() => {
        setFullscreen(value => !value);
    }, []);

    const handleShareScreen = useCallback(() => {
        room.isSharingScreen ? room.unshareScreen() : room.shareScreen();
    }, [room.isSharingScreen]);

    const handleToggleAudio = useCallback(() => {
        room.isAudioOn ? room.muteAudio() : room.unmuteAudio();
    }, [room.isAudioOn]);

    const handleToggleVideo = useCallback(() => {
        room.isVideoOn ? room.muteVideo() : room.unmuteVideo();
    }, [room.isVideoOn]);

    const classNames = classnames('conversation', {
        'conversation--video': room.isVideoOn,
        'conversation--fullscreen': isFullscreen
    });

    return (
        <div ref={rootRef} className={classNames}>
            <header className="conversation__header">
                <Avatar text={remoteParticipant.initials} />

                <div className="conversation__header__text">
                    <Typography variant="subtitle2" noMargin noWrap>{remoteParticipant.name}</Typography>
                    <Typography variant="caption" noMargin noWrap>{room.time ? formatTime(room.time) : 'Offline'}</Typography>
                </div>

                <div className="conversation__header__actions">
                    {room.isConnected ?
                        <>
                            <IconButton
                                icon={room.isAudioOn ? 'mic' : 'mic_off'}
                                onClick={handleToggleAudio}
                            />

                            <IconButton
                                icon={room.isVideoOn ? 'videocam' : 'videocam_off'}
                                onClick={handleToggleVideo}
                            />

                            <IconButton
                                icon={room.isSharingScreen ? 'stop_screen_share' : 'screen_share'}
                                title={room.isSharingScreen ? 'Отключить показ экрана' : 'Показать экран'}
                                onClick={handleShareScreen}
                            />

                            <IconButton
                                icon={isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                                title={isFullscreen ? 'Полный экран' : 'Отключить полный экран'}
                                onClick={handleFullscreen}
                            />

                            <IconButton
                                icon="call_end"
                                title="Завершить звонок"
                                onClick={handleEndCall}
                            />
                        </>
                        :
                        <>
                            <IconButton
                                icon="call"
                                title="Голосовой звонок"
                                onClick={handleAudioCall}
                            />

                            <IconButton
                                icon="videocam"
                                title="Видеозвонок"
                                onClick={handleVideoCall}
                            />
                        </>
                    }
                </div>
            </header>

            <section className="conversation__main">
                <div className="call">
                    <div></div>
                    <video ref={localMediaRef} className="media media--local" />
                    <video ref={remoteMediaRef} className="media media--remote" />
                </div>

                <Chat
                    name={name}
                    localParticipant={localParticipant}
                    remoteParticipan={remoteParticipant}
                />
            </section>
        </div>
    );
}

function formatTime(ms) {
    const min = parseInt(ms / 60000);
    const sec = parseInt((ms / 1000) % 60);

    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}