import { useCallback, useEffect, useRef, useState } from 'react';
import {
    IconButton,
    Menu
} from 'mdc-react';
import classnames from 'classnames';
import moment from 'moment';

import { useChat } from 'shared/hooks/twilio';
import LoadingIndicator from 'shared/components/loading-indicator';

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
                <ul className="message-list">
                    {chat.messages.map(message =>
                        <li
                            id={message.id}
                            key={message.id}
                            className={classnames('message', {
                                'message--local': message.author === user.id,
                                'message--remote': message.author !== user.id,
                                [`message--${message.type}`]: message.type
                            })}
                            onContextMenu={event => handleContextMenu(event, message)}
                        >
                            <span className="message__time">{moment(message.datetime).format('HH:mm')}</span>
                            <span className="message__text">{message.body}</span>
                        </li>
                    )}
                </ul>
            </section>

            <footer className="chat__footer">
                <form className="message-form" onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        placeholder="Сообщение"
                        onKeyPress={handleKeyPress}
                    />

                    <IconButton
                        type="submit"
                        icon="send"
                    />
                </form>
            </footer>

            <Menu
                open={isMenuOpen}
                anchor={anchor}
                top right
                onClose={handleMenuClose}
            >
                <Menu.Item
                    text="Удалить"
                    onClick={handleDelete}
                />
            </Menu>
        </article >
    );
}