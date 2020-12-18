import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    IconButton,
    Menu
} from 'mdc-react';
import classnames from 'classnames';
import moment from 'moment';

import { useChat } from 'shared/hooks/twilio';
import LoadingIndicator from 'shared/components/loading-indicator';

import './index.scss';

export default function Chat({ name, user }) {
    const chat = useChat(window.TWILIO_CHAT_TOKEN);

    const inputRef = useRef();

    const [message, setMessage] = useState();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [anchor, setAnchor] = useState();

    useEffect(() => {
        chat.connect({ name });
    }, [name]);

    const handleSubmit = useCallback(event => {
        event.preventDefault();

        chat.sendMessage(inputRef.current.value);

        inputRef.current.value = '';
    }, [chat]);

    const handleDelete = useCallback(event => {
        setMessage(null);
        chat.deleteMessage(message);
    }, [chat]);

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
            <ul className="message-list">
                {chat.messages.map(message =>
                    <li
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