import React, { useRef, useCallback } from 'react';
import {
    IconButton
} from 'mdc-react';
import classnames from 'classnames';
import moment from 'moment';

import LoadingIndicator from 'shared/components/loading-indicator';

import './index.scss';

export default function Chat({
    user,
    messages,

    onTyping = Function.prototype,
    onSubmit = Function.prototype,
}) {
    const inputRef = useRef();

    const handleSubmit = useCallback(event => {
        event.preventDefault();

        onSubmit(inputRef.current.value);

        inputRef.current.value = '';
    }, [onSubmit]);

    const handleKeyPress = useCallback(() => {
        onTyping();
    }, []);

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
        </article >
    );
}