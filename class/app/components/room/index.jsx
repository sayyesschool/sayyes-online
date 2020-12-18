import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    Avatar,
    Dialog,
    IconButton,
    Typography
} from 'mdc-react';
import classnames from 'classnames';

import { useRoom } from 'shared/hooks/twilio';
import LoadingIndicator from 'shared/components/loading-indicator';

import WaitingRoom from 'app/components/waiting-room';

import './index.scss';

export default function Room({ name, localParticipant, remoteParticipant, children }) {
    const rootRef = useRef();
    const localWebcamRef = useRef();
    const remoteWebcamRef = useRef();
    const remoteScreenRef = useRef();

    const [isFullscreen, setFullscreen] = useState(false);
    const [isParticipantOnline, setParticipantOnline] = useState(false);

    const room = useRoom(window.TWILIO_VIDEO_TOKEN, {
        localWebcamRef,
        remoteWebcamRef,
        remoteScreenRef
    });

    useEffect(() => {
        rootRef.current.addEventListener('fullscreenchange', event => {
            setFullscreen(document.fullscreenElement === event.target);
        });
    }, []);

    useEffect(() => {
        if (isFullscreen) {
            rootRef.current.requestFullscreen();
        } else if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }, [isFullscreen]);

    const handleConnect = useCallback(({ audio, video }) => {
        room.connect({ name, audio, video });
    }, []);

    const handleToggleAudio = useCallback(() => {
        room.isAudioOn ? room.muteAudio() : room.unmuteAudio();
    }, [room.isAudioOn]);

    const handleToggleVideo = useCallback(() => {
        room.isVideoOn ? room.muteVideo() : room.unmuteVideo();
    }, [room.isVideoOn]);

    const handleShareScreen = useCallback(() => {
        room.isSharingScreen ? room.unshareScreen() : room.shareScreen();
    }, [room.isSharingScreen]);

    const handleFullscreen = useCallback(() => {
        setFullscreen(value => !value);
    }, []);

    const handleEndCall = useCallback(() => {
        room.disconnect();
        setFullscreen(false);
    }, []);

    const classNames = classnames('room', {
        'room--connected': room.isConnected,
        'room--participant-online': isParticipantOnline,
        'room--participant-offline': !isParticipantOnline,
        'room--video': room.isVideoOn,
        'room--fullscreen': isFullscreen
    });

    return (
        <div ref={rootRef} className={classNames}>
            {room.isConnected &&
                <header className="room__header">
                    <Avatar text={remoteParticipant.initials} />

                    <div className="room__header__text">
                        <Typography type="subtitle2" noMargin noWrap>{remoteParticipant.fullname}</Typography>

                        {room.time &&
                            <Typography type="caption" noMargin noWrap>{formatTime(room.time)}</Typography>
                        }
                    </div>

                    <div className="room__header__actions">
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
                    </div>
                </header>
            }

            {room.isConnecting &&
                <LoadingIndicator />
            }

            {!room.isConnected && !room.isConnecting &&
                <WaitingRoom
                    onConnect={handleConnect}
                />
            }

            <section className="room__content">
                <section className="room__main">
                    {/* <div ref={remoteScreenRef} className="media media--screen" /> */}
                    {room.isConnected && children}
                </section>

                <aside className="room__aside">
                    <div ref={localWebcamRef} className="media media--local" />
                    <div ref={remoteWebcamRef} className="media media--remote" />
                </aside>
            </section>

            <Dialog
                title="Доступ к камере"
                content="Предоставьте доступ к камере, чтобы собеседник мог видеть вас."
            />
        </div>
    );
}

function formatTime(ms) {
    const min = parseInt(ms / 60000);
    const sec = parseInt((ms / 1000) % 60);

    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}