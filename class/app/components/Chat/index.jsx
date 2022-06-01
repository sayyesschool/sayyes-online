import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Chat as FluentChat } from '@fluentui/react-northstar';
import classnames from 'classnames';
import moment from 'moment';

import { useChat } from 'shared/hooks/twilio';
import Icon from 'shared/components/icon';
import LoadingIndicator from 'shared/components/loading-indicator';
import TextArea from 'shared/components/text-area';

import './index.scss';

export default function Chat({ name, user, onConnected }) {
    const chat = useChat(window.TWILIO_CHAT_TOKEN, user.id);

    const mainRef = useRef();
    const inputRef = useRef();
    const audioRef = useRef();

    const [message, setMessage] = useState();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [anchor, setAnchor] = useState();
    const [needsToScroll, setNeedsToScroll] = useState();

    useEffect(() => {
        chat.connect({
            name,
            onConnected: handleConnected,
            onMessageAdded: handleMessageAdded
        });

        return () => chat.disconnect();
    }, [name]);

    useEffect(() => {
        if (needsToScroll) {
            const timeoutId = setTimeout(() => {
                const mainElement = mainRef.current;

                mainElement.scrollTop = mainElement.scrollHeight - mainElement.clientHeight;

                clearTimeout(timeoutId);
            }, 0);
        }
    }, [needsToScroll]);

    const handleConnected = useCallback(channel => {
        audioRef.current = new Audio('https://static.sayyesonline.ru/assets/audios/chat-new-message.mp3');
        onConnected(channel);
    }, [onConnected]);

    const handleMessageAdded = useCallback(message => {
        if (message.isRemote) {
            audioRef.current?.play();
        }

        const needsToScroll = (Math.trunc(mainRef.current.scrollTop) + mainRef.current.clientHeight) === mainRef.current.scrollHeight;

        setNeedsToScroll(needsToScroll);
    }, []);

    const handleSubmit = useCallback(event => {
        event.preventDefault();

        if (!inputRef.current.value) return;

        chat.sendMessage(inputRef.current.value);

        inputRef.current.value = '';
    }, [chat]);

    const handleDelete = useCallback(event => {
        setMessage(null);
        chat.deleteMessage(message);
    }, [chat, message]);

    const handleKeyPress = useCallback(() => {
        //onTyping();
    }, []);

    const handleContextMenu = useCallback((event, message) => {
        event.stopPropagation();
        event.preventDefault();

        if (user.id !== message.author) return;

        setMessage(message);
        setAnchor(event.currentTarget);
        setMenuOpen(true);
    }, [user]);

    const handleMenuClose = useCallback(event => {
        setMenuOpen(false);
    }, []);

    if (!chat.messages) return <LoadingIndicator />;

    return (
        <article className="chat">
            <section ref={mainRef} className="chat__main">
                <FluentChat
                    items={chat.messages.map(message => ({
                        key: message.id,
                        contentPosition: message.author === user.id ? 'start' : 'end',
                        message: (
                            <FluentChat.Message
                                id={message.id}
                                className={`message--${message.type}`}
                                author={message.author.fullname}
                                content={message.body}
                                timestamp={moment(message.datetime).format('HH:mm')}
                                onContextMenu={event => handleContextMenu(event, message)}
                            />
                        )
                    }))}
                />
            </section>

            <footer className="chat__footer">
                <form className="message-form" onSubmit={handleSubmit}>
                    <TextArea
                        ref={inputRef}
                        placeholder="Сообщение"
                        inverted
                        autoResize
                        onKeyPress={handleKeyPress}
                    />

                    <Button
                        type="submit"
                        title="Отправить"
                        icon={<Icon>send</Icon>}
                        iconOnly
                        text
                    />
                </form>
            </footer>
        </article>
    );
}