import { NavLink } from 'react-router-dom';
import {
    Button,
    Icon,
    IconButton,
    TabBar, Tab,
    TopAppBar
} from 'mdc-react';

import { formatTime } from 'app/utils';

import useRoomState from 'app/hooks/useRoomState';
import useConnectedTime from 'app/hooks/useConnectedTime';

import ToggleAudioButton from 'app/components/ToggleAudioButton';
import ToggleVideoButton from 'app/components/ToggleVideoButton';
import ToggleScreenShareButton from 'app/components/ToggleScreenShareButton';

import './index.scss';

export default function RoomHeader({
    user,
    location,
    isSharingScreen,
    isFullscreen,
    onFullscreen,
    onSync,
    onDisconnect,
    children,
    ...props
}) {
    const roomState = useRoomState();
    const connectedTime = useConnectedTime();

    const isReconnecting = roomState === 'reconnecting';
    const path = location.pathname.split('/')[1] || '/';

    return (
        <TopAppBar className="room-header" {...props}>
            <TopAppBar.Row>
                <TopAppBar.Section className="room-header__text" align="start">
                    <TopAppBar.Title>{formatTime(connectedTime)}</TopAppBar.Title>
                </TopAppBar.Section>

                <TopAppBar.Section className="room-header__tabs" align="center">
                    <TabBar
                        value={path}
                        align="center"
                        minWidth
                    >
                        <Tab
                            component={NavLink}
                            to="/"
                            value="/"
                            icon={<Icon>video_camera_front</Icon>}
                            label="Видео"
                        />

                        <Tab
                            component={NavLink}
                            to="/courses"
                            value="courses"
                            icon={<Icon>book</Icon>}
                            label="Курс"
                        />

                        <Tab
                            component={NavLink}
                            to="/whiteboard"
                            value="whiteboard"
                            icon={<Icon>draw</Icon>}
                            label="Доска"
                        />
                    </TabBar>
                </TopAppBar.Section>

                <TopAppBar.Section className="room-header__actions" align="end">
                    {user.role === 'teacher' &&
                        <TopAppBar.ActionItem>
                            <IconButton
                                key="sync"
                                icon="sync"
                                onClick={onSync}
                            />
                        </TopAppBar.ActionItem>
                    }

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
                            onClick={onFullscreen}
                        />
                    </TopAppBar.ActionItem>

                    <TopAppBar.ActionItem>
                        <Button
                            className="end-call-button"
                            label="Завершить"
                            unelevated
                            onClick={onDisconnect}
                        />
                    </TopAppBar.ActionItem>
                </TopAppBar.Section>
            </TopAppBar.Row>
        </TopAppBar>
    );
}