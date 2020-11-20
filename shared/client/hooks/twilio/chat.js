import { useRef, useState, useCallback } from 'react';
import { Client } from 'twilio-chat';

export function useChat(token) {
    const clientRef = useRef();
    const channelRef = useRef();

    const [isLoading, setLoading] = useState(false);
    const [isConnected, setConnected] = useState(false);
    const [isTyping, setTyping] = useState(false);
    const [messages, setMessages] = useState();

    const connect = useCallback(({ name, onConnected = Function.prototype }) => {
        function tokenExpired() {
            fetch()
                .then(token => {
                    client.updateToken(token);
                })
                .catch(error => {
                    console.error('Could not refresh token', error);
                });
        }

        function memberJoined(member) {
            // onMemberJoined(member);
        }

        function memberLeft(member) {
            // onMemberLeft(member);
        }

        function messageAdded(message) {
            setMessages(messages => messages.concat({
                author: message.author,
                date: message.date,
                body: message.body
            }));
        }

        function typingStarted(member) {
            setTyping(true);
        }

        function typingEnded(member) {
            setTyping(false);
        }

        setLoading(true);

        Client.create(token).then(client => {
            client.on('tokenExpired', tokenExpired);

            clientRef.current = client;

            return client.getChannelByUniqueName(name);
        })
            .catch(() => {
                return clientRef.current.createChannel({ uniqueName: name });
            })
            .then(channel => {
                return channel.join().catch(error => {
                    if (channel.status === 'joined') {
                        return channel;
                    } else {
                        throw error;
                    }
                });
            })
            .then(channel => {
                onConnected(channel);

                channel.on('memberJoined', memberJoined);
                channel.on('memberLeft', memberLeft);
                channel.on('messageAdded', messageAdded);
                channel.on('typingStarted', typingStarted);
                channel.on('typingEnded', typingEnded);

                channelRef.current = channel;

                return channel.getMessages(100);
            })
            .then(messages => {
                setMessages(messages.items.map(message => ({
                    id: message.state.sid,
                    author: message.state.author,
                    body: message.state.body,
                    datetime: message.state.timestamp,
                    type: message.state.type
                })));

                setLoading(false);
                setConnected(true);
            })
            .catch(error => {
                console.error(error);
            });
    }, [token]);

    const disconnect = useCallback(() => {
        channelRef.current.leave().then(leftChannel => {
            // leftChannel.removeListener('messageAdded', messageAdded);
            // leftChannel.removeListener('memberJoined', memberJoined);
            // leftChannel.removeListener('memberLeft', memberLeft);
            // leftChannel.removeListener('typingStarted', typingStarted);
            // leftChannel.removeListener('typingEnded', typingEnded);
        });
        clientRef.current?.shutdown();
    }, []);

    return {
        channel: channelRef.current,
        connect,
        disconnect,
        messages,
        isConnected,
        isLoading,
        isTyping
    };
}