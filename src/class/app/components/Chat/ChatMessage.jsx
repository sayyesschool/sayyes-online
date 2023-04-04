import classnames from 'classnames';

import ChatMessageMedia from './ChatMessageMedia';
import ChatMessageText from './ChatMessageText';

export default function ChatMessage({ message, time, attached, showInfo }) {
    return (
        <div
            key={message.id}
            className={classnames(
                'ChatMessage',
                `ChatMessage--${message.type}`,
                `ChatMessage--attached-${attached}`, {
                'ChatMessage--local': message.isLocal
            })}
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
        </div>
    );
}