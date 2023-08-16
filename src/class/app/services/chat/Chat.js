import { EventEmitter } from 'events';
import { Client } from '@twilio/conversations';

import Conversation from './Conversation';

export default class Chat extends EventEmitter {
    _client = null;
    _clientState = undefined;
    _connectionState = undefined;
    _conversation = null;

    get messages() {
        return this._conversation.messages;
    }

    constructor({ token, conversationId, userId }) {
        super();

        this._token = token;
        this._conversationId = conversationId;
        this._userId = userId;
        this._client = new Client(this._token);

        this._handleStateChanged = this._handleStateChanged.bind(this);
        this._handleConnectionStateChanged = this._handleConnectionStateChanged.bind(this);
        this._handleTokenExpired = this._handleTokenExpired.bind(this);
        this._handleMessageAdded = this._handleMessageAdded.bind(this);
        this._handleMessageUpdated = this._handleMessageUpdated.bind(this);
        this._handleMessageRemoved = this._handleMessageRemoved.bind(this);
        this._handleConversationError = this._handleConversationError.bind(this);
    }

    async init() {
        const client = this._client;

        client.on('stateChanged', this._handleStateChanged);
        client.on('connectionStateChanged', this._handleConnectionStateChanged);
        client.on('tokenAboutToExpire', this._handleTokenExpired);
        client.on('tokenExpired', this._handleTokenExpired);
    }

    destroy() {
        this._conversation?.destroy();

        const client = this._client;

        client.off('stateChanged', this._handleStateChanged);
        client.off('connectionStateChanged', this._handleConnectionStateChanged);
        client.off('tokenAboutToExpire', this._handleTokenExpired);
        client.off('tokenExpired', this._handleTokenExpired);

        client.shutdown();
    }

    async sendMessage(content) {
        return this._conversation.sendMessage(content);
    }

    async updateMessage(id, content) {
        return this._conversation.updateMessage(id, content);
    }

    async deleteMessage(message) {
        return this._conversation.deleteMessage(message);
    }

    async setAllMessagesRead() {
        return this._conversation.setAllMessagesRead();
    }

    _handleStateChanged(state) {
        this._clientState = state;

        if (state === 'failed') {
            this.emit('error', new Error('There was a problem connecting to Twilio\'s conversation service.'));
        }
    }

    _handleConnectionStateChanged(state) {
        this._connectionState = state;

        if (state === 'connected') {
            this.emit('connected');

            this._client.getConversationByUniqueName(this._conversationId)
                .catch(error => {
                    if (error.status !== 404) throw error;

                    return this._client.createConversation({
                        uniqueName: conversationId
                    });
                })
                .then(client => {
                    this._conversation = new Conversation(client, this._userId);
                    this._conversation.on('messageAdded', this._handleMessageAdded);
                    this._conversation.on('messageUpdated', this._handleMessageUpdated);
                    this._conversation.on('messageRemoved', this._handleMessageRemoved);
                    this._conversation.on('error', this._handleConversationError);
                    return this._conversation.init();
                })
                .then(() => {
                    return this._conversation.join();
                })
                .then(() => {
                    this.emit('joined');
                })
                .catch(error => {
                    this.emit('error', error);
                });
        }
    }

    _handleTokenExpired() {
        fetch(`/twilio/tokens/chat?identity=${userId}`)
            .then(token => {
                this._client.updateToken(token);
            })
            .catch(error => {
                this.emit('Could not refresh token', error);
            });
    }

    _handleMessageAdded(message) {
        this.emit('messageAdded', message);
    }

    _handleMessageUpdated(message) {
        this.emit('messageUpdated', message);
    }

    _handleMessageRemoved(message) {
        this.emit('messageRemoved', message);
    }

    _handleConversationError(error) {
        this.emit('error', error);
    }
}