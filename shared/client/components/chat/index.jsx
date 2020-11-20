import React, { useRef, useState, useCallback } from 'react';
import {
    IconButton,
    Menu
} from 'mdc-react';
import classnames from 'classnames';
import moment from 'moment';

import LoadingIndicator from 'shared/components/loading-indicator';

import './index.scss';

export default function Chat({
    user,
    messages,
    onDelete,

    onTyping = Function.prototype,
    onSubmit = Function.prototype,
}) {
    const inputRef = useRef();

    const [message, setMessage] = useState();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [anchor, setAnchor] = useState();

    const handleSubmit = useCallback(event => {
        event.preventDefault();

        onSubmit(inputRef.current.value);

        inputRef.current.value = '';
    }, [onSubmit]);

    const handleKeyPress = useCallback(() => {
        onTyping();
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

    const handleDelete = useCallback(event => {
        setMessage(null);
        onDelete(message);
    }, [message]);

    if (!messages) return <LoadingIndicator />;

    return (
        <article className="chat">
            <ul className="message-list">
                {messages.map(message =>
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