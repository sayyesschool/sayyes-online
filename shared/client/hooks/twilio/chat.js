import { useRef, useState, useCallback, useMemo } from 'react';
import { Client } from 'twilio-chat';

export function useChat(token, identity) {
    const clientRef = useRef();
    const channelRef = useRef();

    const [state, setState] = useState();
    const [messages, setMessages] = useState();
    const [isTyping, setTyping] = useState(false);

    const connect = useCallback(({ name, onConnected = Function.prototype }) => {
        function tokenExpired() {
            fetch(`/twilio/tokens/chat?identity=${identity}&room=${name}`)
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
            setMessages(messages => messages.concat(message));
        }

        function messageRemoved(message) {
            setMessages(messages => messages.filter(m => m.sid !== message.sid));
        }

        function typingStarted(member) {
            setTyping(true);
        }

        function typingEnded(member) {
            setTyping(false);
        }

        Client.create(token).then(client => {
            client.on('tokenExpired', tokenExpired);
            client.on('connectionStateChanged', setState);

            clientRef.current = client;

            return client.getChannelByUniqueName(name);
        })
            .catch(() => {
                return clientRef.current.createChannel({
                    uniqueName: name,
                    isPrivate: false
                });
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
                channel.on('messageRemoved', messageRemoved);
                channel.on('typingStarted', typingStarted);
                channel.on('typingEnded', typingEnded);

                channelRef.current = channel;

                return channel.getMessages(100);
            })
            .then(messages => {
                setMessages(messages.items);
            })
            .catch(error => {
                console.error(error);
            });
    }, [token]);

    const disconnect = useCallback(() => {
        channelRef.current.leave().then(leftChannel => {
            leftChannel.removeListener('messageAdded', messageAdded);
            leftChannel.removeListener('memberJoined', memberJoined);
            leftChannel.removeListener('memberLeft', memberLeft);
            leftChannel.removeListener('typingStarted', typingStarted);
            leftChannel.removeListener('typingEnded', typingEnded);
        });
        clientRef.current?.shutdown();
    }, []);

    const sendMessage = useCallback(message => {
        channelRef.current.sendMessage(message);
    }, []);

    const deleteMessage = useCallback(message => {
        messages.find(m => m.sid === message.id)?.remove().catch(error => console.error('ERROR', error));
    }, [messages]);

    return useMemo(() => ({
        get client() {
            return clientRef.current;
        },
        get channel() {
            return channelRef.current;
        },
        get isConnected() {
            return state === 'connected';
        },
        get messages() {
            return messages?.map(message => ({
                id: message.sid,
                author: message.author,
                body: message.body,
                datetime: message.dateCreated,
                type: message.type
            }));
        },
        connect,
        disconnect,
        sendMessage,
        deleteMessage,
        isTyping
    }), [state, messages, isTyping]);
}