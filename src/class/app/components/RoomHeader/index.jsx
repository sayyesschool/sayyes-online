import { NavLink, useRouteMatch } from 'react-router-dom';

import { Button, IconButton, Tabs } from 'shared/ui-components';

import useRoomState from 'app/hooks/useRoomState';

import ConnectedTime from 'app/components/ConnectedTime';
import ToggleAudioButton from 'app/components/ToggleAudioButton';
import ToggleChatButton from 'app/components/ToggleChatButton';
import ToggleFullscreenButton from 'app/components/ToggleFullscreenButton';
import ToggleScreenShareButton from 'app/components/ToggleScreenShareButton';
import ToggleVideoButton from 'app/components/ToggleVideoButton';

import './index.scss';

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
                    defaultValue={views.indexOf(match.params?.view)}
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
                            color: match.url === '/' ? 'primary' : 'neutral',
                            variant: match.url === '/' ? 'soft' : 'plain'
                        },
                        {
                            key: 'courses',
                            as: NavLink,
                            to: '/courses',
                            value: '/courses',
                            icon: 'book',
                            content: 'Курс',
                            color: match.url === '/courses' ? 'primary' : 'neutral',
                            variant: match.url === '/courses' ? 'soft' : 'plain'
                        },
                        {
                            key: 'whiteboard',
                            as: NavLink,
                            to: '/whiteboard',
                            value: '/whiteboard',
                            icon: 'draw',
                            content: 'Доска',
                            color: match.url === '/whiteboard' ? 'primary' : 'neutral',
                            variant: match.url === '/whiteboard' ? 'soft' : 'plain'
                        }
                    ]}
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
                    numberOfUnreadMessages={numberOfUnreadMessages}
                    onClick={onChatToggle}
                />

                <ToggleAudioButton disabled={isReconnecting} />

                <ToggleVideoButton disabled={isReconnecting} />

                {!isSharingScreen &&
                    <ToggleScreenShareButton disabled={isReconnecting} />
                }

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