import React from 'react';
import {
    Banner,
    Button,
    Icon,
    IconButton,
    TopAppBar
} from 'mdc-react';

import { formatTime } from 'app/utils';
import useRoomContext from 'app/hooks/useRoomContext';
import useRoomState from 'app/hooks/useRoomState';
import useConnectedTime from 'app/hooks/useConnectedTime';
import ToggleAudioButton from 'app/components/ToggleAudioButton';
import ToggleVideoButton from 'app/components/ToggleVideoButton';
import ToggleScreenShareButton from 'app/components/ToggleScreenShareButton';

import './index.scss';

export default function RoomHeader({ isFullscreen, handleFullscreen, children, ...props }) {
    const { room, isSharingScreen, toggleScreenShare } = useRoomContext();
    const roomState = useRoomState();
    const connectedTime = useConnectedTime();

    const isReconnecting = roomState === 'reconnecting';

    return (
        <>
            <TopAppBar className="room__header" {...props}>
                <TopAppBar.Row>
                    <TopAppBar.Section className="room__header__text" align="start">
                        <TopAppBar.Title>{formatTime(connectedTime)}</TopAppBar.Title>
                    </TopAppBar.Section>

                    <TopAppBar.Section className="room__header__tabs" align="center">
                        {children}
                    </TopAppBar.Section>

                    <TopAppBar.Section className="room__header__actions" align="end">
                        <TopAppBar.ActionItem>
                            <ToggleAudioButton disabled={isReconnecting} />
                        </TopAppBar.ActionItem>

                        <TopAppBar.ActionItem>
                            <ToggleVideoButton disabled={isReconnecting} />
                        </TopAppBar.ActionItem>

                        {!isSharingScreen &&
                            <TopAppBar.ActionItem>
                                <ToggleScreenShareButton disabled={isReconnecting} />
                            </TopAppBar.ActionItem>
                        }

                        <TopAppBar.ActionItem>
                            <IconButton
                                icon={isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                                title={isFullscreen ? 'Полный экран' : 'Отключить полный экран'}
                                onClick={handleFullscreen}
                            />
                        </TopAppBar.ActionItem>

                        <TopAppBar.ActionItem>
                            <Button
                                className="end-call-button"
                                label="Завершить"
                                unelevated
                                onClick={() => room.disconnect()}
                            />
                        </TopAppBar.ActionItem>
                    </TopAppBar.Section>
                </TopAppBar.Row>
            </TopAppBar>

            <Banner
                className="screen-sharing-banner"
                open={isSharingScreen}
                icon={<Icon>screen_share</Icon>}
                text="Вы делитесь своим экраном"
                action={
                    <Button onClick={() => toggleScreenShare()}>Остановить</Button>
                }
                centered
            />
        </>
    );
}