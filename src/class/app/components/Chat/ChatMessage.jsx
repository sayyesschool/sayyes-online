import { useCallback, useState } from 'react';

import classnames from 'classnames';

import ChatMessageMedia from './ChatMessageMedia';
import ChatMessageText from './ChatMessageText';
import { Menu, Surface } from 'shared/ui-components';

export default function ChatMessage({
    message,
    time,
    attached,
    showInfo
}) {
    const [anchorElement, setAnchorElement] = useState();
    const [menuOpen, setMenuOpen] = useState(false);

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
        <Surface
            className={classnames(
                'ChatMessage',
                `ChatMessage--${message.type}`,
                `ChatMessage--attached-${attached}`, {
                'ChatMessage--local': message.isLocal,
                'ChatMessage--remote': !message.isLocal
            })}
            color={message.isLocal ? 'primary' : 'neutral'}
            variant="soft"
            onContextMenu={message.isLocal ? handleRootRightClick : undefined}
        >
            {showInfo &&
                <div className="ChatMessage__info">
                    <time>{time}</time>
                </div>
            }

            <div className="ChatMessage__content">
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
            </div>

            {message.isLocal && anchorElement &&
                <Menu
                    anchorElement={anchorElement}
                    open={menuOpen}
                    items={[
                        {
                            key: 'edit',
                            content: 'Изменить'
                        },
                        {
                            key: 'delete',
                            content: 'Удалить'
                        }
                    ]}
                    onClose={handleMenuClose}
                />
            }
        </Surface>
    );
}