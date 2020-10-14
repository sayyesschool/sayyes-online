import { useRef, useState, useEffect } from 'react';
import { Client } from 'twilio-chat';

export function useChat(token, { name }) {
    const clientRef = useRef();
    const channelRef = useRef();

    const [isLoading, setLoading] = useState(false);
    const [isConnected, setConnected] = useState(false);
    const [isTyping, setTyping] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!token) return;

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
            console.log(member.identity + ' joined the channel');
        }

        function memberLeft(member) {
            console.log(member.identity + ' left the channel');
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
                return client.createChannel({ uniqueName: name });
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
                console.log('Joined channel', channel);

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

        return () => {
            // channel.leave().then(leftChannel => {
            //     leftChannel.removeListener('messageAdded', messageAdded);
            //     leftChannel.removeListener('memberJoined', memberJoined);
            //     leftChannel.removeListener('memberLeft', memberLeft);
            //     leftChannel.removeListener('typingStarted', typingStarted);
            //     leftChannel.removeListener('typingEnded', typingEnded);
            // });
            clientRef.current?.shutdown();
        };
    }, [token]);


    return {
        channel: channelRef.current,
        messages,
        isConnected,
        isLoading,
        isTyping
    };
}