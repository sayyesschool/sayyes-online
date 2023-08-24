import { EventEmitter } from 'events';
import { connect } from 'twilio-video';

import Audio from './Audio';
import Video from './Video';
import ScreenShare from './ScreenShare';

export default class Room extends EventEmitter {
    _room = null;
    audio = null;
    video = null;
    screenShare = null;
    dominantSpeaker = null;
    selectedParticipant = null;
    screenSharingParticipant = null;

    get id() {
        return this._room?.sid;
    }

    get name() {
        return this._room?.name;
    }

    get state() {
        return this._room?.state;
    }

    get localParticipant() {
        return this._room?.localParticipant;
    }

    get participants() {
        const participants = Array.from(this._room?.participants);
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

    get remoteScreenShareParticipant() {
        return this.screenSharingParticipant;
    }

    get isAudioEnabled() {
        return this.audio.isEnabled;
    }

    get isAudioStarted() {
        return this.audio.isStarted;
    }

    get isVideoEnabled() {
        return this.video.isEnabled;
    }

    get isVideoStarted() {
        return this.video.isStarted;
    }

    get isScreenSharing() {
        return this.screenShare.isActive;
    }

    constructor() {
        super();

        this.audio = new Audio(this);
        this.video = new Video(this);
        this.screenShare = new ScreenShare(this);

        this._handleAudioStarted = this._handleAudioStarted.bind(this);
        this._handleAudioStopped = this._handleAudioStopped.bind(this);
        this._handleAudioEnabled = this._handleAudioEnabled.bind(this);
        this._handleAudioDisabled = this._handleAudioDisabled.bind(this);

        this._handleVideoStarted = this._handleVideoStarted.bind(this);
        this._handleVideoStopped = this._handleVideoStopped.bind(this);
        this._handleVideoEnabled = this._handleVideoEnabled.bind(this);
        this._handleVideoDisabled = this._handleVideoDisabled.bind(this);

        this._handleParticipantConnected = this._handleParticipantConnected.bind(this);
        this._handleParticipantDisconnected = this._handleParticipantDisconnected.bind(this);

        this._handleDominantSpeakerChanged = this._handleDominantSpeakerChanged.bind(this);

        this._handleReconnecting = this._handleDominantSpeakerChanged.bind(this);
        this._handleReconnected = this._handleReconnected.bind(this);

        this._handleError = this._handleError.bind(this);
    }

    async init(options = {}) {
        this.audio.on('started', this._handleAudioStarted);
        this.audio.on('stopped', this._handleAudioStopped);
        this.audio.on('enabled', this._handleAudioEnabled);
        this.audio.on('disabled', this._handleAudioDisabled);
        this.audio.on('error', this._handleError);

        this.video.on('enabled', this._handleVideoEnabled);
        this.video.on('disabled', this._handleVideoDisabled);
        this.video.on('started', this._handleVideoStarted);
        this.video.on('stopped', this._handleVideoStopped);
        this.video.on('error', this._handleError);

        this.screenShare.on('started', this._handleScreenShareStarted);
        this.screenShare.on('stopped', this._handleScreenShareStopped);
        this.screenShare.on('error', this._handleError);

        await this.audio.init(options.video);
        await this.video.init(options.audio);

        this.emit('initialized', this);
    }

    destroy() {
        this.disconnect();

        this.audio.destroy();
        this.video.destroy();

        this.audio.off('started', this._handleAudioStarted);
        this.audio.off('stopped', this._handleAudioStopped);
        this.audio.off('enabled', this._handleAudioEnabled);
        this.audio.off('disabled', this._handleAudioDisabled);
        this.audio.off('error', this._handleError);

        this.video.off('started', this._handleVideoStarted);
        this.video.off('stopped', this._handleVideoStopped);
        this.video.off('enabled', this._handleVideoEnabled);
        this.video.off('disabled', this._handleVideoDisabled);
        this.video.off('error', this._handleError);

        this.screenShare.off('started', this._handleScreenShareStarted);
        this.screenShare.off('stopped', this._handleScreenShareStopped);
        this.screenShare.off('error', this._handleError);
    }

    async connect(token, connectionOptions = {}) {
        const room = await connect(token, {
            ...connectionOptions,
            tracks: [this.audio.track, this.video.track]
        }).catch(this._handleError);

        // This app can add up to 16 'participantDisconnected' listeners to the room object, which can trigger
        // a warning from the EventEmitter object. Here we increase the max listeners to suppress the warning.
        room.setMaxListeners(16);

        // All video tracks are published with 'low' priority because the video track
        // that is displayed in the 'MainParticipant' component will have it's priority
        // set to 'high' via track.setPriority()
        room.localParticipant.videoTracks.forEach(publication => publication.setPriority('low'));

        room.once('disconnected', this._handleDisconnected);
        room.on('reconnecting', this._handleReconnecting);
        room.on('reconnected', this._handleReconnected);

        room.on('participantConnected', this._handleParticipantConnected);
        room.on('participantDisconnected', this._handleParticipantDisconnected);

        room.on('trackPublished', this._handleTrackPublished);
        room.on('trackUnpublished', this._handleTrackUnpublished);

        room.on('dominantSpeakerChanged', this._handleDominantSpeakerChanged);

        room.localParticipant.on('trackPublicationFailed', this._handleError);

        this._room = room;
        this.emit('connected', this);

        return this;
    }

    disconnect() {
        const room = this._room;

        room.disconnect();

        room.off('disconnected', this._handleDisconnected);
        room.off('reconnecting', this._handleReconnecting);
        room.off('reconnected', this._handleReconnected);

        room.off('participantConnected', this._handleParticipantConnected);
        room.off('participantDisconnected', this._handleParticipantDisconnected);

        room.off('trackPublished', this._handleTrackPublished);
        room.off('trackUnpublished', this._handleTrackUnpublished);

        room.off('dominantSpeakerChanged', this._handleDominantSpeakerChanged);

        room.off('error', this._handleError);

        room.localParticipant.off('trackPublicationFailed', this._handleError);
    }

    startAudio() {
        this.audio.start();
    }

    stopAudio() {
        this.audio.stop();
    }

    toggleAudio() {
        this.audio.toggle();
    }

    startVideo() {
        this.video.start();
    }

    stopVideo() {
        this.video.stop();
    }

    toggleVideo() {
        this.video.toggle();
    }

    startScreenShare() {
        this.screenShare.start();
    }

    stopScreenShare() {
        this.screenShare.stop();
    }

    selectParticipant(participant) {
        this.selectParticipant = participant;
        this.emit('selectedParticipantChanged', this.selectParticipant);
    }

    deselectParticipant() {
        this.selectedParticipant = null;
        this.emit('selectedParticipantChanged', this.selectParticipant);
    }

    _handleDisconnected(room, error) {
        this.selectedParticipant = null;
        this.dominantSpeaker = null;

        if (error)
            this._handleError(error);

        // Reset the room only after all other `disconnected` listeners have been called.
        setTimeout(() => {
            this._room = new EventEmitter();
        }, 0);

        this.emit('disconnected');
    }

    _handleReconnecting() {
        this.status = 'reconnecting';
        this.emit('reconnecting');
    }

    _handleReconnected() {
        this.emit('reconnected');
    }

    _handleAudioStarted() {
        this.emit('audioStarted');
    }

    _handleAudioStopped() {
        this.emit('audioStopped');
    }

    _handleAudioEnabled() {
        this.emit('audioEnabled');
    }

    _handleAudioDisabled() {
        this.emit('audioDisabled');
    }

    _handleVideoStarted() {
        this.emit('videoStarted');
    }

    _handleVideoStopped() {
        this.emit('videoStopped');
    }

    _handleVideoEnabled() {
        this.emit('videoEnabled');
    }

    _handleVideoDisabled() {
        this.emit('videoDisabled');
    }

    _handleScreenShareStarted() {
        this.emit('screeShareStarted');
    }

    _handleScreenShareStopped() {
        this.emit('screeShareStopped');
    }

    _handleParticipantConnected(participant) {
        this.participants = this.participants.concat(participant);
        this.emit('participantConnected', participant);
    }

    _handleParticipantDisconnected(participant) {
        this.participants.filter(p => p !== participant);

        if (this.selectedParticipant === participant) {
            this.deselectParticipant(participant);
        }

        this.emit('participantDisconnected', participant);
    }

    _handleTrackPublished(track) {
        this.emit('trackPublished', track);
    }

    _handleTrackUnpublished(track) {
        this.emit('trackUnpublished', track);
    }

    _handleDominantSpeakerChanged(dominantSpeaker) {
        this.dominantSpeaker = dominantSpeaker;
        this.emit('dominantSpeakerChanged');
    }

    _handleError(error) {
        console.error('RoomError', error);
        this.emit('error', error);
    }
}