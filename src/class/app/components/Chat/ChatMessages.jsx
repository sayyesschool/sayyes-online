import { useCallback, useEffect, useRef } from 'react';

import { useScroll } from 'shared/hooks/scroll';
import { IconButton } from 'shared/ui-components';

import ChatMessage from './ChatMessage';

export default function ChatMessages({
    messages,
    onEdit,
    onDelete,
    onSeenLastMessage
}) {
    const listRef = useRef();

    const { isScrolledToBottom, scrollToBottom } = useScroll(listRef, {
        onScrolledToBottom: () => {
            onSeenLastMessage?.();
        }
    });

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleScrollButtonClick = useCallback(() => {
        scrollToBottom();
    }, []);

    return (
        <div className="ChatMessages">
            <div ref={listRef} className="ChatMessages__list">
                {messages.map((message, i) => {
                    const time = getFormattedTime(message.createdAt);
                    const previousTime = getFormattedTime(messages[i - 1]?.createdAt);

                    // Display the MessageInfo component when the author or formatted timestamp differs from the previous message
                    const shouldDisplayMessageInfo = time !== previousTime || message.author !== messages[i - 1]?.author;

                    return (
                        <ChatMessage
                            key={message.id}
                            message={message}
                            time={time}
                            showInfo={shouldDisplayMessageInfo}
                            attached={getAttachedValue(message, messages[i - 1], messages[i + 1])}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    );
                })}
            </div>

            {!isScrolledToBottom &&
                <IconButton
                    className="ChatMessages__scroll-button"
                    icon="arrow_downward"
                    title="Пролистать вниз"
                    variant="soft"
                    onClick={handleScrollButtonClick}
                />
            }
        </div>
    );
}

function getFormattedTime(date) {
    return date?.toLocaleTimeString('ru-ru', {
        hour: 'numeric',
        minute: 'numeric'
    }).toLowerCase();
}

function getAttachedValue(message, prevMessage, nextMessage) {
    const author = message.author;
    const prevAuthor = prevMessage?.author;
    const nextAuthor = nextMessage?.author;

    if (prevAuthor !== author && nextAuthor === author) {
        return 'top';
    }

    if (prevAuthor === author && nextAuthor === author) {
        return 'middle';
    }

    if (nextAuthor !== author && prevAuthor === message.author) {
        return 'bottom';
    }
}