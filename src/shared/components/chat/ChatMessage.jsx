import { useCallback, useState } from 'react';

import { Menu, Surface } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';

import ChatMessageMedia from './ChatMessageMedia';
import ChatMessageText from './ChatMessageText';

export default function ChatMessage({
    message,
    time,
    attached,
    showInfo,
    onEdit,
    onDelete
}) {
    const [anchorElement, setAnchorElement] = useState();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleEditClick = useCallback(() => {
        onEdit?.(message);
    }, [message, onEdit]);

    const handleDeleteClick = useCallback(() => {
        onDelete?.(message);
    }, [message, onDelete]);

    const handleRootRightClick = useCallback(event => {
        event.preventDefault();
        setAnchorElement(event.target);
        setMenuOpen(true);
    }, []);

    const handleMenuClose = useCallback(event => {
        setAnchorElement();
        setMenuOpen(false);
    }, []);

    return (
        <div
            className={classnames(
                'ChatMessage',
                `ChatMessage--${message.type}`,
                `ChatMessage--attached-${attached}`, {
                    'ChatMessage--local': message.isLocal,
                    'ChatMessage--remote': !message.isLocal
                })}
            onContextMenu={message.isLocal ? handleRootRightClick : undefined}
        >
            <Surface
                className="ChatMessage__content"
                color={message.isLocal ? 'primary' : 'neutral'}
                variant="soft"
            >
                {message.type === 'text' &&
                    <ChatMessageText
                        text={message.body}
                    />
                }

                {message.type === 'media' &&
                    <ChatMessageMedia
                        media={message.attachedMedia[0]}
                    />
                }
            </Surface>

            {showInfo &&
                <div className="ChatMessage__info">
                    <time>{time}</time>
                </div>
            }

            {message.isLocal && anchorElement &&
                <Menu
                    anchorElement={anchorElement}
                    open={menuOpen}
                    items={[
                        {
                            key: 'edit',
                            content: 'Изменить',
                            onClick: handleEditClick
                        },
                        {
                            key: 'delete',
                            content: 'Удалить',
                            onClick: handleDeleteClick
                        }
                    ]}
                    onClose={handleMenuClose}
                />
            }
        </div>
    );
}