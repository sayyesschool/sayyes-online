import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    IconButton,
    List, ListItem
} from 'mdc-react';
import classnames from 'classnames';

import { useChat } from 'shared/hooks/twilio';

import LoadingIndicator from 'shared/components/loading-indicator';

import './index.scss';

export default function Chat({ identity, name }) {
    const inputRef = useRef();
    const [token, setToken] = useState();
    // const { channel, messages } = useChat(token, { name });

    // useEffect(() => {
    //     if (lesson) {
    //         fetch(`/api/twilio/tokens/chat?identity=${identity}`)
    //             .then(res => res.json())
    //             .then(res => setToken(res.data.token));
    //     }
    // }, [lesson]);

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

    const channel = undefined;

    return (
        <article className="chat">
            {!channel ?
                <LoadingIndicator />
                :
                <List className="message-list">
                    {messages.map(message =>
                        <ListItem
                            key={message.id}
                            className={classnames('message-item', {
                                'message-item--local': message.author === user.id,
                                'message-item--remote': message.local !== user.id
                            })}
                        >
                            {message.body}
                        </ListItem>
                    )}
                </List>
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
                    disabled={!channel}
                />
            </form>
        </article>
    );
}