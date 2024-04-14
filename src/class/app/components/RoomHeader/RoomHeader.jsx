import { NavLink, useRouteMatch } from 'react-router-dom';

import { Button, IconButton, Tabs } from 'shared/ui-components';

import ConnectedTime from 'class/components/ConnectedTime';
import ToggleAudioButton from 'class/components/ToggleAudioButton';
import ToggleChatButton from 'class/components/ToggleChatButton';
import ToggleFullscreenButton from 'class/components/ToggleFullscreenButton';
import ToggleScreenShareButton from 'class/components/ToggleScreenShareButton';
import ToggleVideoButton from 'class/components/ToggleVideoButton';
import useRoomState from 'class/hooks/useRoomState';

const views = [undefined, 'courses', 'whiteboard'];

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

    const match = useRouteMatch('/:view?');

    const isReconnecting = roomState === 'reconnecting';

    return (
        <header className="RoomHeader" {...props}>
            <div className="RoomHeader__text">
                <ConnectedTime />
            </div>

            <div className="RoomHeader__tabs">
                <Tabs
                    defaultValue={match.params?.view || '/'}
                    size="sm"
                    variant="plain"
                    items={[
                        {
                            key: 'video',
                            as: NavLink,
                            to: '/',
                            value: '/',
                            icon: 'video_camera_front',
                            content: 'Видео',
                            color: match.url === '/' ? 'primary' : 'neutral'
                        },
                        {
                            key: 'courses',
                            as: NavLink,
                            to: '/courses',
                            value: 'courses',
                            icon: 'book',
                            content: 'Обучающие материалы',
                            color: match.url === '/courses' ? 'primary' : 'neutral'
                        },
                        {
                            key: 'whiteboard',
                            as: NavLink,
                            to: '/whiteboard',
                            value: 'whiteboard',
                            icon: 'draw',
                            content: 'Доска',
                            color: match.url === '/whiteboard' ? 'primary' : 'neutral'
                        }
                    ]}
                    disableUnderline
                />
            </div>

            <div className="RoomHeader__actions">
                {user.role === 'teacher' &&
                    <IconButton
                        icon="sync"
                        title="Синхронизировать"
                        variant="plain"
                        size="sm"
                        onClick={onSync}
                    />
                }

                <ToggleChatButton
                    active={isChatOpen}
                    badgeCount={numberOfUnreadMessages}
                    onClick={onChatToggle}
                />

                <ToggleAudioButton disabled={isReconnecting} />
                <ToggleVideoButton disabled={isReconnecting} />
                <ToggleScreenShareButton disabled={isReconnecting} />

                <ToggleFullscreenButton
                    active={isFullscreen}
                    onClick={onFullscreenToggle}
                />

                <Button
                    content="Завершить"
                    color="danger"
                    variant="solid"
                    size="sm"
                    onClick={onDisconnect}
                />
            </div>
        </header>
    );
}