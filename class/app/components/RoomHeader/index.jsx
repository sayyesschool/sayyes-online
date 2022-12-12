import { NavLink } from 'react-router-dom';

import { Button, Flex, Icon, Tabs, Text } from 'shared/ui-components';

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
    isChatOpen,
    isSharingScreen,
    isFullscreen,
    numberOfUnreadMessages,
    onChatToggle,
    onFullscreenToggle,
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
        <header className="room-header" {...props}>
            <Flex className="room-header__text">
                <Text>{formatTime(connectedTime)}</Text>
            </Flex>

            <Flex className="room-header__tabs">
                <Tabs
                    items={[
                        {
                            key: 'video',
                            as: NavLink,
                            to: '/',
                            value: '/',
                            icon: <Icon>video_camera_front</Icon>,
                            content: 'Видео'
                        },
                        {
                            key: 'courses',
                            as: NavLink,
                            to: '/courses',
                            value: 'courses',
                            icon: <Icon>book</Icon>,
                            content: 'Курс'
                        },
                        {
                            key: 'whiteboard',
                            as: NavLink,
                            to: '/whiteboard',
                            value: 'whiteboard',
                            icon: <Icon>draw</Icon>,
                            content: 'Доска'
                        }
                    ]}
                />
            </Flex>

            <Flex className="room-header__actions">
                {user.role === 'teacher' &&
                    <Button
                        className="sync-button"
                        icon={<Icon>sync</Icon>}
                        iconOnly
                        text
                        title="Синхронизировать"
                        onClick={onSync}
                    />
                }

                <Button
                    className="chat-button"
                    title="Чат"
                    icon={<Icon>forum</Icon>}
                    primary={isChatOpen}
                    data-count={numberOfUnreadMessages || undefined}
                    iconOnly
                    text
                    onClick={onChatToggle}
                />

                <ToggleAudioButton disabled={isReconnecting} />

                <ToggleVideoButton disabled={isReconnecting} />

                {!isSharingScreen &&
                    <ToggleScreenShareButton disabled={isReconnecting} />
                }

                <Button
                    className="toggle-fullscreen-button"
                    icon={<Icon>{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</Icon>}
                    iconOnly
                    text
                    title={isFullscreen ? 'Полный экран' : 'Отключить полный экран'}
                    onClick={onFullscreenToggle}
                />

                <Button
                    className="end-call-button"
                    content="Завершить"
                    primary
                    flat
                    onClick={onDisconnect}
                />
            </Flex>
        </header>
    );
}