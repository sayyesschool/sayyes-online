import { Client } from 'twilio-chat';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    Card, CardHeader, CardSection,
    Banner,
    Button,
    Icon,
    LayoutGrid, LayoutGridCell,
    List, ListItem,
    Spinner,
    Typography,
    TextField
} from 'mdc-react';
import classnames from 'classnames';

import './index.scss';

export default function Chat({ token, name, user, members }) {
    const inputRef = useRef();
    const [client, setClient] = useState();
    const [channel, setChannel] = useState();
    const [messages, setMessages] = useState([]);
    const [isTyping, setTyping] = useState(false);

    const handleSubmit = useCallback(event => {
        event.preventDefault();

        channel.sendMessage(inputRef.current.value);

        inputRef.current.value = '';
    }, [channel]);

    const handleKeyPress = useCallback(event => {
        channel.typing();
    }, [channel]);

    useEffect(() => {
        Client.create(token).then(client => {
            setClient(client);

            function refreshToken() {
                fetch()
                    .then(token => {
                        client.updateToken(token);
                    })
                    .catch(error => {
                        console.error('Could not refresh token', error);
                    });
            }

            client.on('tokenExpired', refreshToken);

            client.getChannelByUniqueName(name)
                .then(
                    channel => {
                        console.log('Found channel', channel);
                        return channel;
                    },
                    () => {
                        console.log('Create channel');
                        client.createChannel({ uniqueName: name });
                    }
                )
                .then(channel => {
                    console.log('CHANNEL', channel);
                    return setChannel(channel);
                })
                .catch(error => {
                    console.error('Could not get channel', error);
                });
        });

        return () => {
            client;
        };
    }, []);

    useEffect(() => {
        function messageAdded(message) {
            setMessages(messages => messages.concat({
                username: message.author,
                date: message.date,
                body: message.body
            }));
        }

        function memberJoined(member) {
            console.log(member.identity + ' joined the channel');
        }

        function memberLeft(member) {
            console.log(member.identity + ' left the channel');
        }

        function typingStarted(member) {
            setTyping(true);
        }

        function typingEnded(member) {
            setTyping(false);
        }

        if (channel) {
            channel.join()
                .catch(error => {
                    if (channel.status === 'joined') {
                        return channel;
                    } else {
                        throw error;
                    }
                })
                .then(channel => {
                    console.log('Joined channel', channel);

                    channel.on('messageAdded', messageAdded);
                    channel.on('memberJoined', memberJoined);
                    channel.on('memberLeft', memberLeft);
                    channel.on('typingStarted', typingStarted);
                    channel.on('typingEnded', typingEnded);

                    channel.getMessages(100)
                        .then(messages => {
                            setMessages(messages.items.map(message => ({
                                id: message.state.sid,
                                author: message.state.author,
                                body: message.state.body,
                                timestamp: message.state.timestamp,
                                local: message.state.author === user.id
                            })));
                        });
                })
                .catch(error => {
                    console.log('Could not join channel', error);
                });
        }

        // return () => {
        //     channel.leave().then(leftChannel => {
        //         leftChannel.removeListener('messageAdded', messageAdded);
        //         leftChannel.removeListener('memberJoined', memberJoined);
        //         leftChannel.removeListener('memberLeft', memberLeft);
        //         leftChannel.removeListener('typingStarted', typingStarted);
        //         leftChannel.removeListener('typingEnded', typingEnded);
        //     });
        // };
    }, [channel]);

    if (!client) return <Spinner />;

    return (
        <Card id="lesson-chat" outlined>
            <CardHeader
                title="Чат"
                subtitle="Подключен"
            />

            <CardSection primary>
                <List className="message-list">
                    {messages.map(message =>
                        <ListItem
                            key={message.id}
                            className={classnames('message-item', {
                                'message-item--local': message.local,
                                'message-item--remote': !message.local
                            })}
                        >
                            {message.body}
                        </ListItem>
                    )}
                </List>
            </CardSection>

            <CardSection>
                <form onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        onKeyPress={handleKeyPress}
                    />
                </form>
            </CardSection>
        </Card>
    );
}