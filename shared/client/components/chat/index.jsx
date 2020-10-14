import React, { useRef, useCallback } from 'react';
import {
    IconButton
} from 'mdc-react';
import classnames from 'classnames';
import moment from 'moment';

import { useChat } from 'shared/hooks/twilio';
import LoadingIndicator from 'shared/components/loading-indicator';

import './index.scss';

export default function Chat({ name, localParticipant: user }) {
    const inputRef = useRef();
    const { channel, isLoading, isConnected, messages } = useChat(window.TWILIO_CHAT_TOKEN, { name });

    const handleSubmit = useCallback(event => {
        event.preventDefault();

        channel.sendMessage(inputRef.current.value);

        inputRef.current.value = '';
    }, [channel]);

    const handleKeyPress = useCallback(event => {
        channel.typing();
    }, [channel]);

    // const members = {
    //     [lesson.client.id]: lesson.client.name,
    //     [lesson.teacher.id]: lesson.teacher.name
    // };
    return (
        <article className="chat">
            {isLoading ?
                <LoadingIndicator />
                :
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
                            <span className="message__time">{moment(message.datetime).fromNow()}</span>
                            <span className="message__text">{message.body}</span>
                        </li>
                    )}
                </ul>
            }

            <form className="message-form" onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    placeholder="Сообщение"
                    onKeyPress={handleKeyPress}
                />

                <IconButton
                    type="submit"
                    icon="send"
                    disabled={!isConnected}
                />
            </form>
        </article >
    );
}