import { useCallback, useEffect, useRef, useState } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import { IconButton, Textarea } from 'shared/ui-components';

import useChat from 'app/hooks/useChat';
import ChatMessages from './ChatMessages';

export default function Chat({
    conversationId,
    userId,
    participants,
    onConnected,
    onError
}) {
    const chat = useChat({
        token: window.TWILIO_CHAT_TOKEN,
        conversationId,
        userId
    });

    const mainRef = useRef();
    const audioRef = useRef(new Audio(STORAGE_URL + '/assets/audios/chat-new-message.mp3'));
    const sendButtonRef = useRef();
    const textareaRef = useRef();

    const [value, setValue] = useState('');

    useEffect(() => {
        mainRef.current?.scrollTo(0, mainRef.current?.scrollHeight);
    }, [chat?.messages]);

    const handleConnected = useCallback(channel => {
        onConnected(channel);
    }, [onConnected]);

    const handleMessageAdded = useCallback(message => {
        if (message.isRemote) {
            audioRef.current?.play();
        }
    }, []);

    const handleDelete = useCallback(message => {
        chat.deleteMessage(message);
    }, [chat]);

    const handleChange = useCallback(event => {
        //onTyping();
    }, []);

    const handleSubmit = useCallback(event => {
        event.preventDefault();
    }, []);

    const handleKeyPress = useCallback(event => {
        //onTyping();

        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            const value = event.target.value;

            if (!value) return;

            chat.sendMessage(value);
            event.target.value = '';
            event.target.focus();
        }
    }, []);

    if (!chat.messages) return <LoadingIndicator />;

    return (
        <div className="Chat">
            <div ref={mainRef} className="Chat__main">
                <ChatMessages
                    messages={chat.messages}
                />
            </div>

            <form className="Chat__form" onSubmit={handleSubmit}>
                <Textarea
                    ref={textareaRef}
                    defaultValue=""
                    placeholder="Сообщение"
                    endDecorator={
                        <IconButton
                            ref={sendButtonRef}
                            type="submit"
                            icon="send"
                            title="Отправить"
                            sx={{ marginLeft: 'auto' }}
                        />
                    }
                    onKeyPress={handleKeyPress}
                />
            </form>
        </div>
    );
}