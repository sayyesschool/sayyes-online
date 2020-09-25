import { useState, useEffect } from 'react';
import { Client } from 'twilio-chat';

export function useChat(token, { name }) {
    const [client, setClient] = useState();
    const [channel, setChannel] = useState();
    const [messages, setMessages] = useState([]);
    const [isTyping, setTyping] = useState(false);

    useEffect(() => {
        if (!token) return;

        Client.create(token).then(client => {
            setClient(client);

            client.on('tokenExpired', () => {
                fetch()
                    .then(token => {
                        client.updateToken(token);
                    })
                    .catch(error => {
                        console.error('Could not refresh token', error);
                    });
            });

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
            client.shutdown();
        };
    }, [token]);

    useEffect(() => {
        function messageAdded(message) {
            setMessages(messages => messages.concat({
                author: message.author,
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
                                timestamp: message.state.timestamp
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

    return {
        client,
        channel,
        messages,
        isTyping
    };
}