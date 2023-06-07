import EventEmitter from 'events';
import Video from 'twilio-video';

import Camera from './Camera';
import Microphone from './Microphone';

export default class Room extends EventEmitter {
    #connectionOptions = {};
    #room = null;
    camera = null;
    microphone = null;
    localParticipant = null;
    participants = [];
    selectedParticipant = null;
    dominantSpeaker = null;
    screenSharingParticipant = null;

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

    constructor(connectionOptions = {}) {
        this.#connectionOptions = connectionOptions;
        this.camera = new Camera();
        this.microphone = new Microphone();
    }

    async init() {
        await this.camera.init();
        await this.microphone.init();
    }

    connect(token) {
        Video.connect(token, this.#connectionOptions)
            .then(room => {
                // This app can add up to 16 'participantDisconnected' listeners to the room object, which can trigger
                // a warning from the EventEmitter object. Here we increase the max listeners to suppress the warning.
                room.setMaxListeners(16);

                // All video tracks are published with 'low' priority because the video track
                // that is displayed in the 'MainParticipant' component will have it's priority
                // set to 'high' via track.setPriority()
                room.localParticipant.videoTracks.forEach(publication => publication.setPriority('low'));

                room.on('participantConnected', participantConnected);
                room.on('participantDisconnected', participantDisconnected);
                room.on('dominantSpeakerChanged', handleDominantSpeakerChanged);
                room.once('disconnected', () => this.#handleDisconnected());

                this.#room = room;
                this.localParticipant = room.localParticipant;
                this.participants = Array.from(room.participants.values());
            });
    }

    disconnect() {
        this.#room.disconnect();
        this.selectedParticipant = null;
        this.dominantSpeaker = null;
    }

    destroy() {
        room.off('participantConnected', participantConnected);
        room.off('participantDisconnected', participantDisconnected);
        room.off('dominantSpeakerChanged', handleDominantSpeakerChanged);
    }

    #handleParticipantConnected(participant) {
        this.participants = [...this.participants, participant];

        this.emit('participantConnected');
    }

    #handleParticipantDisconnected(participant) {
        this.participants.filter(p => p !== participant);

        if (this.selectedParticipant === participant) {
            this.selectedParticipant = null;
        }

        // Since 'null' values are ignored, we will need to listen for the 'participantDisconnected'
        // event, so we can set the dominantSpeaker to 'null' when they disconnect.
        if (this.dominantSpeaker === participant) {
            this.dominantSpeaker = null;
        }

        this.emit('participantDisconnected');
    }

    #handleDominantSpeakerChanged(newDominantSpeakerChanged) {
        // Sometimes, the 'dominantSpeakerChanged' event can emit 'null', which means that
        // there is no dominant speaker. If we change the main participant when 'null' is
        // emitted, the effect can be jarring to the user. Here we ignore any 'null' values
        // and continue to display the previous dominant speaker as the main participant.
        if (newDominantSpeaker !== null) {
            this.dominantSpeaker = newDominantSpeaker;
        }

        this.emit('dominantSpeakerChanged');
    }

    #handleDisconnected() {
        // Reset the room only after all other `disconnected` listeners have been called.
        setTimeout(() => {
            this.#room = new EventEmitter();
        });

        this.emit('disconnected');
    }
}