// import MessageListScrollContainer from './MessageListScrollContainer';
import ChatMessage from './ChatMessage';

export default function ChatMessages({ messages }) {
    return (
        <div className="ChatMessages">
            {/* <MessageListScrollContainer messages={messages}> */}
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
                    />
                );
            })}
            {/* </MessageListScrollContainer> */}
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