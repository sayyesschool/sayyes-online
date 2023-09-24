import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Chat from 'shared/services/chat';

export default function useChat({ token, conversationId, userId }) {
    const chatRef = useRef();
    const audioRef = useRef(new Audio(STORAGE_URL + '/assets/audios/chat-new-message.mp3'));

    const [isJoined, setJoined] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chatRef.current) return;

        const chat = new Chat({ token, conversationId, userId });

        chat.init();

        chat.once('joined', () => {
            setJoined(true);
            setMessages(chat.messages);
        });

        chat.on('messageAdded', () => {
            audioRef.current?.play();
            setMessages(chat.messages);
        });

        chat.on('messageUpdated', () => {
            console.log('useChat messageUpdated', chat.messages);
            setMessages(chat.messages);
        });

        chat.on('messageRemoved', () => {
            setMessages(chat.messages);
        });

        chatRef.current = chat;

        return () => {
            chat?.destroy();
        };
    }, [token]);

    const sendMessage = useCallback((message) => {
        return chatRef.current.sendMessage(message);
    }, []);

    const updateMessage = useCallback((id, content) => {
        return chatRef.current.updateMessage(id, content);
    }, []);

    const deleteMessage = useCallback((message) => {
        return chatRef.current.deleteMessage(message);
    }, []);

    const setAllMessagesRead = useCallback(() => {
        return chatRef.current.setAllMessagesRead();
    }, []);

    return useMemo(() => ({
        isJoined,
        messages,
        sendMessage,
        updateMessage,
        deleteMessage,
        setAllMessagesRead
    }), [isJoined, messages]);
}