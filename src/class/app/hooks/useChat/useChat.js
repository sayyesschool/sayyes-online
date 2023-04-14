import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Client } from '@twilio/conversations';

export default function useChat({ token, conversationId, userId, participantsById }) {
    const clientRef = useRef();
    const conversationRef = useRef();
    const audioRef = useRef(new Audio(STORAGE_URL + '/assets/audios/chat-new-message.mp3'));

    const [participants, setParticipants] = useState();
    const [messages, setMessages] = useState();
    const [clientState, setClientState] = useState();
    const [connectionState, setConnectionState] = useState();
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
    const [isTyping, setTyping] = useState(false);

    useEffect(() => {
        if (clientRef.current) return;

        const client = new Client(token);

        clientRef.current = client;

        client.on('tokenAboutToExpire', tokenExpired);
        client.on('tokenExpired', tokenExpired);
        client.on('stateChanged', handleStateChanged);
        client.on('connectionStateChanged', handleConnectionStateChanged);

        return () => {
            const client = clientRef.current;

            client.off('tokenAboutToExpire', tokenExpired);
            client.off('tokenExpired', tokenExpired);
            client.off('stateChanged', handleStateChanged);
            client.off('connectionStateChanged', handleConnectionStateChanged);

            client.shutdown();
        };

        function tokenExpired() {
            fetch(`/twilio/tokens/chat?identity=${userId}`)
                .then(token => {
                    client.updateToken(token);
                })
                .catch(error => {
                    console.error('Could not refresh token', error);
                });
        }

        function handleStateChanged(state) {
            setClientState(state);

            if (state === 'failed') {
                console.error("There was a problem connecting to Twilio's conversation service.");
                // onError(new Error("There was a problem connecting to Twilio's conversation service."));
            }
        }

        function handleConnectionStateChanged(state) {
            setConnectionState(state);
        }
    }, [token, userId]);

    useEffect(() => {
        if (
            connectionState !== 'connected' || conversationRef.current
        ) return;

        getConversationById(clientRef.current, conversationId, participantsById)
            .then(conversation => {
                conversationRef.current = conversation;

                conversation.getParticipants()
                    .then(participants => setParticipants(participants));

                /* get the latest messages of the conversation. optional arguments:
                    pageSize | 30,
                    anchor | "end",
                    direction | "backwards"
                */
                conversation.getMessages(100)
                    .then(messagesPaginator => {
                        const messages = messagesPaginator.items.map(message => mapMessage(message, userId));
                        setMessages(messages);
                    });

                return conversation;
            })
            .then(conversation => {
                conversation.on('participantJoined', handleParticipantJoined);
                conversation.on('participantLeft', handleParticipantLeft);
                conversation.on('messageAdded', handleMessageAdded);
                conversation.on('messageRemoved', handleMessageRemoved);
                conversation.on('typingStarted', handleTypingStarted);
                conversation.on('typingEnded', handleTypingEnded);
            })
            .catch(e => {
                console.dir(e);
                // onError(new Error('There was a problem getting the Conversation associated with this room.'));
            });

        return () => {
            const conversation = conversationRef.current;

            conversation?.off('participantJoined', handleParticipantJoined);
            conversation?.off('participantLeft', handleParticipantLeft);
            conversation?.off('messageAdded', handleMessageAdded);
            conversation?.off('messageRemoved', handleMessageRemoved);
            conversation?.off('typingStarted', handleTypingStarted);
            conversation?.off('typingEnded', handleTypingEnded);
        };

        function handleParticipantJoined(participant) {
            setParticipants(participants => participants.concat(participant));
        }

        function handleParticipantLeft(participant) {
            setParticipants(participants => participants.concat(participant));
        }

        function handleMessageAdded(message) {
            // onMessageAdded(message);
            const mappedMessage = mapMessage(message, userId);

            if (mappedMessage.isRemote) {
                audioRef.current?.play();
            }

            setMessages(messages => messages.concat(mappedMessage));
        }

        function handleMessageRemoved(message) {
            // onMessageRemoved(message);
            setMessages(messages => messages.filter(m => m.sid !== message.sid));
        }

        function handleTypingStarted(member) {
            setTyping(true);
        }

        function handleTypingEnded(member) {
            setTyping(false);
        }
    }, [connectionState, conversationId, userId]);

    const sendMessage = useCallback(message => {
        conversationRef.current.sendMessage(message);
    }, []);

    const deleteMessage = useCallback(message => {
        messages.find(m => m.id === message.id)?.remove()
            .catch(error => console.error('ERROR', error));
    }, [messages]);

    return useMemo(() => ({
        get client() {
            return clientRef.current;
        },
        get conversation() {
            return conversationRef.current;
        },
        get isConnected() {
            return clientState === 'connected';
        },
        state: clientState,
        messages,
        sendMessage,
        deleteMessage,
        isTyping
    }), [clientState, messages, isTyping]);
}

function getConversationById(client, conversationId, participantsById) {
    return client.getConversationByUniqueName(conversationId)
        .catch(error => {
            if (error.status !== 404) throw error;

            return client.createConversation({
                uniqueName: conversationId
            });
        })
        .then(conversation => {
            return conversation.getParticipants()
                .then(participants => {
                    const roomParticipantIds = participants.map(p => p.identity);
                    const participantIdsToAdd = Array.from(Object.keys(participantsById))
                        .filter(id => !roomParticipantIds.includes(id));

                    return Promise.all(
                        participantIdsToAdd.map(participantId => {
                            return conversation.add(participantId);
                        })
                    ).then(() => conversation);
                });
        })
        .then(conversation => {
            return conversation.join().catch(error => {
                if (conversation.status === 'joined') {
                    return conversation;
                } else {
                    throw error;
                }
            });
        });
}

function mapMessage(message, userId) {
    return {
        id: message.sid,
        author: message.author,
        type: message.type,
        isLocal: message.author === userId,
        isRemote: message.author !== userId,
        body: message.body,
        createdAt: message.dateCreated,
        updatedAt: message.dateUpdated
    };
}