import { useCallback, useState } from 'react';

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

    const [editingMessage, setEditingMessage] = useState();

    const handleTyping = useCallback(event => {
        //onTyping();
    }, []);

    const handleSubmitMessage = useCallback(content => {
        if (editingMessage) {
            setEditingMessage();
            return chat.updateMessage(editingMessage.id, content);
        } else {
            return chat.sendMessage(content);
        }
    }, [chat, editingMessage]);

    const handleDeleteMessage = useCallback(message => {
        return chat.deleteMessage(message);
    }, [chat]);

    const handleSendFile = useCallback(file => {
        return chat.sendMessage(file);
    }, [chat]);

    const handleSeenLastMessage = useCallback(() => {
        return chat.setAllMessagesRead();
    }, []);

    const handleEditMessage = useCallback(message => {
        setEditingMessage(message);
    }, []);

    const handleCancelEditingMessage = useCallback(() => {
        setEditingMessage();
    }, []);

    if (!chat.messages) return <LoadingIndicator />;

    return (
        <div className="Chat">
            <ChatMessages
                messages={chat.messages}
                onEdit={handleEditMessage}
                onDelete={handleDeleteMessage}
                onSeenLastMessage={handleSeenLastMessage}
            />

            <ChatInput
                editingMessage={editingMessage}
                onSubmitMessage={handleSubmitMessage}
                onSendFile={handleSendFile}
                onTyping={handleTyping}
                onCancelEditing={handleCancelEditingMessage}
            />
        </div>
    );
}