import EventEmitter from 'events';
import Video from 'twilio-video';

import Camera from './Camera';
import Microphone from './Microphone';

export default class Room extends EventEmitter {
    #room = null;
    state = '';
    camera = null;
    microphone = null;
    selectedParticipant = null;
    dominantSpeaker = null;
    screenSharingParticipant = null;

    get room() {
        return this.#room;
    }

    get id() {
        return this.#room?.sid;
    }

    get name() {
        return this.#room?.name;
    }

    get state() {
        return this.#room?.state;
    }

    get localParticipant() {
        return this.#room?.localParticipant;
    }

    get participants() {
        const participants = Array.from(this.#room?.participants);
        const dominantSpeaker = this.dominantSpeaker;

        // When the dominant speaker changes, they are moved to the front of the participants array.
        if (this.dominantSpeaker)
            return [
                dominantSpeaker,
                ...participants.filter(participant => participant !== dominantSpeaker)
            ];
        else
            return participants;
    }

    get mainParticipant() {
        // Changing the order of the following values will change the how the main speaker is determined.
        return (
            this.selectedParticipant ||
            this.remoteScreenShareParticipant ||
            this.dominantSpeaker ||
            this.participants[0] ||
            this.localParticipant
        );
    }

    constructor() {
        super();

        this.camera = new Camera();
        this.microphone = new Microphone();

        // this._handleParticipantConnected = this._handleParticipantConnected.bind(this);
        // this._handleParticipantDisconnected = this._handleParticipantDisconnected.bind(this);
        // this._handleDominantSpeakerChanged = this._handleDominantSpeakerChanged.bind(this);
        // this._handleDisconnected = this._handleDisconnected.bind(this);
    }

    async init(options = {}) {
        await this.camera.init(options.video);
        await this.microphone.init(options.audio);
    }

    async connect(token, connectionOptions = {}) {
        const room = await Video.connect(token, {
            ...connectionOptions,
            tracks: [this.camera.videoTrack, this.microphone.audioTrack]
        });

        // This app can add up to 16 'participantDisconnected' listeners to the room object, which can trigger
        // a warning from the EventEmitter object. Here we increase the max listeners to suppress the warning.
        room.setMaxListeners(16);

        // All video tracks are published with 'low' priority because the video track
        // that is displayed in the 'MainParticipant' component will have it's priority
        // set to 'high' via track.setPriority()
        room.localParticipant.videoTracks.forEach(publication => publication.setPriority('low'));

        room.on('participantConnected', this._handleParticipantConnected);
        room.on('participantDisconnected', this._handleParticipantDisconnected);
        room.on('dominantSpeakerChanged', this._handleDominantSpeakerChanged);
        room.on('reconnecting', this._handleReconnecting);
        room.on('reconnected', this._handleReconnected);
        room.once('disconnected', this._handleDisconnected);

        this.#room = room;

        return this;
    }

    disconnect() {
        this.#room.disconnect();
        this.selectedParticipant = null;
        this.dominantSpeaker = null;
    }

    destroy() {
        room.off('participantConnected', this._handleParticipantConnected);
        room.off('participantDisconnected', this._handleParticipantDisconnected);
        room.off('dominantSpeakerChanged', this._handleDominantSpeakerChanged);
        room.off('reconnecting', this._handleReconnecting);
        room.off('reconnected', this._handleReconnected);
        room.off('disconnected', this._handleDisconnected);
    }

    _handleReconnecting() {
        this.emit('reconnecting');
    }

    _handleReconnected() {
        this.emit('reconnected');
    }

    _handleParticipantConnected(participant) {
        this.participants = this.participants.concat(participant);
        this.emit('participantConnected');
    }

    _handleParticipantDisconnected(participant) {
        this.participants.filter(p => p !== participant);

        if (this.selectedParticipant === participant)
            this.selectedParticipant = null;

        this.emit('participantDisconnected');
    }

    _handleDominantSpeakerChanged(dominantSpeaker) {
        this.dominantSpeaker = dominantSpeaker;
        this.emit('dominantSpeakerChanged');
    }

    _handleDisconnected() {
        this.state = this.#room.state;

        // Reset the room only after all other `disconnected` listeners have been called.
        setTimeout(() => {
            this.#room = new EventEmitter();
        }, 0);

        this.emit('disconnected');
    }
}