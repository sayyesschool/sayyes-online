import { EventEmitter } from 'events';

export default class Conversation extends EventEmitter {
    _client = null;
    _userId = undefined;
    _participants = new Set();
    _messages = [];
    _typing = false;

    get messages() {
        return this._messages.map(message => ({
            id: message.sid,
            index: message.index,
            author: message.author,
            type: message.type,
            isLocal: message.author === this._userId,
            isRemote: message.author !== this._userId,
            body: message.body,
            createdAt: message.dateCreated,
            updatedAt: message.dateUpdated
        }));
    }

    constructor(client, userId) {
        super();

        this._client = client;
        this._userId = userId;

        this._handleParticipantJoined = this._handleParticipantJoined.bind(this);
        this._handleParticipantLeft = this._handleParticipantLeft.bind(this);
        this._handleMessageAdded = this._handleMessageAdded.bind(this);
        this._handleMessageUpdated = this._handleMessageUpdated.bind(this);
        this._handleMessageRemoved = this._handleMessageRemoved.bind(this);
        this._handleTypingStarted = this._handleTypingStarted.bind(this);
        this._handleTypingEnded = this._handleTypingEnded.bind(this);
    }

    async init() {
        const client = this._client;

        client.on('participantJoined', this._handleParticipantJoined);
        client.on('participantLeft', this._handleParticipantLeft);
        client.on('messageAdded', this._handleMessageAdded);
        client.on('messageUpdated', this._handleMessageUpdated);
        client.on('messageRemoved', this._handleMessageRemoved);
        client.on('typingStarted', this._handleTypingStarted);
        client.on('typingEnded', this._handleTypingEnded);

        this._client.getParticipants()
            .then(participants => {
                this._participants = participants;

                const participantIds = participants.map(p => p.identity);

                if (!participantIds.includes(this._userId)) {
                    return this._client.add(this._userId);
                }
            });

        /* get the latest messages of the conversation. optional arguments:
            pageSize | 30,
            anchor | "end",
            direction | "backwards"
        */
        this._client.getMessages(100)
            .then(messagesPaginator => {
                this._messages = messagesPaginator.items;
            });
    }

    destroy() {
        const client = this.current;

        client?.off('participantJoined', this._handleParticipantJoined);
        client?.off('participantLeft', this._handleParticipantLeft);
        client?.off('messageAdded', this._handleMessageAdded);
        client?.off('messageUpdated', this._handleMessageUpdated);
        client?.off('messageRemoved', this._handleMessageRemoved);
        client?.off('typingStarted', this._handleTypingStarted);
        client?.off('typingEnded', this._handleTypingEnded);
    }

    async join() {
        return this._client.join()
            .catch(error => {
                if (this._client.status === 'joined') {
                    this._client.getUnreadMessagesCount()
                        .then(count => {
                            this.emit('joined', {
                                unreadMessagesCount: count
                            });
                        });
                } else {
                    throw error;
                }
            });
    }

    async sendMessage(content) {
        return this._client.sendMessage(content)
            .catch(error => {
                this.emit('error', error);
                throw error;
            });
    }

    async updateMessage(id, content) {
        await this._messages.find(m => m.sid === id)?.updateBody(content)
            .catch(error => {
                this.emit('error', error);
                throw error;
            });
    }

    async deleteMessage(message) {
        return this._messages.find(m => m.sid === message.id)?.remove()
            .catch(error => {
                this.emit('error', error);
                throw error;
            });
    }

    async setAllMessagesRead() {
        return this._client.setAllMessagesRead();
    }

    _handleParticipantJoined(participant) {
        this._participants.add(participant);
        this.emit('participantJoined', participant);
    }

    _handleParticipantLeft(participant) {
        this._participants.delete(participant);
        this.emit('participantLeft', participant);
    }

    _handleMessageAdded(message) {
        this._messages.push(message);
        this.emit('messageAdded', message);
    }

    _handleMessageUpdated({ message: updatedMessage, updateReasons } = {}) {
        this._messages = this._messages.map(message =>
            message.sid === updatedMessage.sid ? updatedMessage : message
        );
        this.emit('messageUpdated', updatedMessage);
    }

    _handleMessageRemoved(deletedMessage) {
        this._messages = this._messages.filter(message => message.sid !== deletedMessage.sid);
        this.emit('messageRemoved', deletedMessage);
    }

    _handleTypingStarted(member) {
        this._typing = true;
    }

    _handleTypingEnded(member) {
        this._typing = false;
    }
}