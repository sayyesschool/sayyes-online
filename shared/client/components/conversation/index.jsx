import { useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import { useRoom, useChat } from 'shared/hooks/twilio';
import Avatar from 'shared/ui-components/avatar';
import Button from 'shared/ui-components/button';
import { Chat } from 'shared/ui-components/chat';
import Icon from 'shared/ui-components/icon';
import Text from 'shared/ui-components/text';

import './index.scss';

export default function Conversation({ name, localParticipant, remoteParticipant }) {
    const rootRef = useRef();
    const localWebcamRef = useRef();
    const remoteWebcamRef = useRef();
    const remoteScreenRef = useRef();

    const [isFullscreen, setFullscreen] = useState(false);
    const [isParticipantOnline, setParticipantOnline] = useState(false);

    const chat = useChat(window.TWILIO_CHAT_TOKEN);
    const room = useRoom(window.TWILIO_VIDEO_TOKEN, {
        localWebcamRef,
        remoteWebcamRef,
        remoteScreenRef
    });

    useEffect(() => {
        chat.connect({
            name,
            onConnected: channel => {
                channel.members.forEach(member => {
                    if (member.identity === remoteParticipant.id) {
                        setParticipantOnline(true);
                    }
                });

                channel.on('memberJoined', member => member.identity === remoteParticipant.id && setParticipantOnline(true));
                channel.on('memberLeft', member => member.identity === remoteParticipant.id && setParticipantOnline(false));
            }
        });
    }, [name]);

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

    const handleConnect = useCallback(() => {
        room.connect({ name, audio: true, video: false });
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

    const handleSubmitMessage = useCallback(message => {
        chat.sendMessage(message);
    }, [chat]);

    const handleDeleteMessage = useCallback(message => {
        chat.deleteMessage(message);
    }, [chat]);

    const handleChatTyping = useCallback(() => {
        chat.channel.typing();
    }, []);

    const handleEndCall = useCallback(() => {
        room.disconnect();
        setFullscreen(false);
    }, []);

    const classNames = classnames('conversation', {
        'conversation--participant-online': isParticipantOnline,
        'conversation--participant-offline': !isParticipantOnline,
        'conversation--video': room.isVideoOn,
        'conversation--fullscreen': isFullscreen
    });

    return (
        <div ref={rootRef} className={classNames}>
            <header className="conversation__header">
                <Avatar text={remoteParticipant.initials} />

                <div className="conversation__header__text">
                    <Text type="subtitle2" noWrap>{remoteParticipant.fullname}</Text>

                    {room.time &&
                        <Text type="caption" noWrap>{formatTime(room.time)}</Text>
                    }
                </div>

                <div className="conversation__header__actions">
                    {room.isConnected ?
                        <>
                            <Button
                                icon={room.isAudioOn ? 'mic' : 'mic_off'}
                                onClick={handleToggleAudio}
                            />

                            <Button
                                icon={room.isVideoOn ? 'videocam' : 'videocam_off'}
                                onClick={handleToggleVideo}
                            />

                            <Button
                                icon={room.isSharingScreen ? 'stop_screen_share' : 'screen_share'}
                                title={room.isSharingScreen ? 'Отключить показ экрана' : 'Показать экран'}
                                onClick={handleShareScreen}
                            />

                            <Button
                                icon={isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                                title={isFullscreen ? 'Полный экран' : 'Отключить полный экран'}
                                onClick={handleFullscreen}
                            />

                            <Button
                                icon="call_end"
                                title="Завершить звонок"
                                onClick={handleEndCall}
                            />
                        </>
                        :
                        <Button
                            label="Войти"
                            icon={<Icon>call</Icon>}
                            disabled={room.isConnecting}
                            onClick={handleConnect}
                        />
                    }
                </div>
            </header>

            <section className="conversation__content">
                <section className="conversation__main">
                    <div ref={remoteScreenRef} className="media media--screen" />
                </section>

                <aside className="conversation__aside">
                    <div ref={localWebcamRef} className="media media--local" />
                    <div ref={remoteWebcamRef} className="media media--remote" />

                    <Chat
                        user={localParticipant}
                        messages={chat.messages}
                        onSubmit={handleSubmitMessage}
                        onDelete={handleDeleteMessage}
                        onTyping={handleChatTyping}
                    />
                </aside>
            </section>
        </div>
    );
}

function formatTime(ms) {
    const min = parseInt(ms / 60000);
    const sec = parseInt((ms / 1000) % 60);

    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}