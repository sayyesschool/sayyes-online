import { useCallback, useEffect, useRef } from 'react';
import moment from 'moment';

import { useChat } from 'shared/hooks/twilio';
import { Button, Icon } from 'shared/ui-components';
import { Chat as FluentChat } from 'shared/components/chat';
import LoadingIndicator from 'shared/components/loading-indicator';
import TextArea from 'shared/components/textarea';

import './index.scss';

export default function Chat({ name, user, onConnected }) {
    const chat = useChat(window.TWILIO_CHAT_TOKEN, user.id);

    const mainRef = useRef();
    const audioRef = useRef();
    const sendButtonRef = useRef();
    const textAreaRef = useRef();

    useEffect(() => {
        chat.connect({
            name,
            onConnected: handleConnected,
            onMessageAdded: handleMessageAdded
        });

        return () => chat.disconnect();
    }, [name]);

    useEffect(() => {
        mainRef.current?.scrollTo(0, mainRef.current?.scrollHeight);
    }, [chat?.messages]);

    const handleConnected = useCallback(channel => {
        audioRef.current = new Audio('http://static.sayyesonline.ru/assets/audios/chat-new-message.mp3');
        onConnected(channel);
    }, [onConnected]);

    const handleMessageAdded = useCallback(message => {
        if (message.isRemote) {
            audioRef.current?.play();
        }
    }, []);

    const handleSubmit = useCallback(event => {
        event.preventDefault();

        if (!textAreaRef.current.value) return;

        chat.sendMessage(textAreaRef.current.value);

        textAreaRef.current.value = '';
        textAreaRef.current.style.height = '32px';
        textAreaRef.current.focus();
    }, [chat]);

    const handleDelete = useCallback(message => {
        chat.deleteMessage(message);
    }, [chat]);

    const handleKeyPress = useCallback(event => {
        //onTyping();

        if (event.key === 'Enter' && !event.shiftKey) {
            return handleSubmit(event);
        }
    }, [handleSubmit]);

    if (!chat.messages) return <LoadingIndicator />;

    return (
        <article className="chat">
            <section ref={mainRef} className="chat__main">
                <FluentChat
                    items={chat.messages.map((message, index, messages) => ({
                        key: message.id,
                        contentPosition: message.author === user.id ? 'end' : 'start',
                        attached: getAttachedValue(message, messages[index - 1], messages[index + 1]),
                        message: (
                            <FluentChat.Message
                                id={message.id}
                                className={`message--${message.type}`}
                                author={message.author.fullname}
                                content={message.body}
                                timestamp={moment(message.datetime).format('HH:mm')}
                                mine={message.author === user.id}
                                actionMenu={message.author === user.id && {
                                    iconOnly: true,
                                    items: [
                                        {
                                            key: 'edit',
                                            icon: <Icon name="edit" />,
                                            title: 'Редактировать'
                                        },
                                        {
                                            key: 'delete',
                                            icon: <Icon name="delete" />,
                                            title: 'Удалить',
                                            onClick: () => handleDelete(message)
                                        }
                                    ]
                                }}
                            />
                        )
                    }))}
                />
            </section>

            <footer className="chat__footer">
                <form className="message-form" onSubmit={handleSubmit}>
                    <TextArea
                        ref={textAreaRef}
                        placeholder="Сообщение"
                        defaultValue=""
                        autoResize
                        onKeyPress={handleKeyPress}
                    />

                    <Button
                        ref={sendButtonRef}
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

function getAttachedValue(message, prevMessage, nextMessage) {
    const author = message.author;

    if (prevMessage?.author !== author && nextMessage?.author === author) {
        return 'top';
    }

    if (prevMessage?.author === author && nextMessage?.author === author) {
        return true;
    }

    if (nextMessage?.author !== author && prevMessage?.author === message.author) {
        return 'bottom';
    }
}