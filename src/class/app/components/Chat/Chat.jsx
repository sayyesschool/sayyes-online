import { useCallback } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';

import useChat from 'app/hooks/useChat';

import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

export default function Chat({
    conversationId,
    userId,
    participantsById,
    onConnected,
    onError
}) {
    const chat = useChat({
        token: window.TWILIO_CHAT_TOKEN,
        conversationId,
        userId,
        participantsById
    });

    const handleConnected = useCallback(channel => {
        onConnected(channel);
    }, [onConnected]);

    const handleTyping = useCallback(event => {
        //onTyping();
    }, []);

    const handleSendMessage = useCallback(message => {
        return chat.sendMessage(message);
    }, [chat]);

    const handleSendFile = useCallback(file => {
        return chat.sendMessage(file);
    }, [chat]);

    const handleDeleteMessage = useCallback(message => {
        return chat.deleteMessage(message);
    }, [chat]);

    if (!chat.messages) return <LoadingIndicator />;

    return (
        <div className="Chat">
            <ChatMessages
                messages={chat.messages}
                onDelete={handleDeleteMessage}
            />

            <ChatInput
                onSendMessage={handleSendMessage}
                onSendFile={handleSendFile}
                onTyping={handleTyping}
            />
        </div>
    );
}