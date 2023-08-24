import { EventEmitter } from 'events';

export default class ScreenShare extends EventEmitter {
    _room = null;
    _stream = null;
    _track = null;
    _publication = null;
    _participant = null;

    get isActive() {
        return this._track?.enabled();
    }

    get isLocal() {
        this._room.localParticipant === this._participant;
    }

    constructor(room) {
        super();

        this._room = room;

        this._handleTrackPublished = this._handleTrackPublished.bind(this);
        this._handleTrackUnpublished = this._handleTrackUnpublished.bind(this);
        this._handleParticipantDisconnected = this._handleParticipantDisconnected.bind(this);
    }

    async init() {
        const room = this._room;

        room.on('trackPublished', this._handleTrackPublished);
        room.on('trackUnpublished', this._handleTrackUnpublished);
        room.on('participantDisconnected', this._handleParticipantDisconnected);

        // the room object does not emit 'trackPublished' events for the localParticipant,
        // so we need to listen for them here.
        room.localParticipant.on('trackPublished', this._handleTrackPublished);
        room.localParticipant.on('trackUnpublished', this._handleTrackUnpublished);
    }

    destroy() {
        const room = this._room;

        room.off('trackPublished', this._handleTrackPublished);
        room.off('trackUnpublished', this._handleTrackUnpublished);
        room.off('participantDisconnected', this._handleParticipantDisconnected);

        room.localParticipant.off('trackPublished', this._handleTrackPublished);
        room.localParticipant.off('trackUnpublished', this._handleTrackUnpublished);
    }

    async start() {
        const localParticipant = this._room.localParticipant;

        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                audio: true,
                video: {
                    frameRate: 24,
                    height: 1080,
                    width: 1920
                }
            });

            const track = stream.getTracks()[0];
            track.onended = this.stop.bind(this);

            // All video tracks are published with 'low' priority. This works because the video
            // track that is displayed in the 'MainParticipant' component will have it's priority
            // set to 'high' via track.setPriority()
            this._publication = await localParticipant.publishTrack(this._track, {
                name: 'screen', // Tracks can be named to easily find them later
                priority: 'low', // Priority is set to high by the subscriber when the video track is rendered
            });
            this._stream = stream;
            this._track = track;
        } catch (error) {
            if (
                error.message === 'Permission denied by system' ||
                (error.name !== 'AbortError' && error.name !== 'NotAllowedError')
            ) {
                this.emit('error', error);
            }
        }

        this.emit('started');
    }

    async stop() {
        const localParticipant = this._room.localParticipant;

        this._track.stop();
        localParticipant.unpublishTrack(this._track);
        // TODO: remove this if the SDK is updated to emit this event
        localParticipant.emit('trackUnpublished', this._publication);
        this.emit('stopped');
    }

    _handleTrackPublished() {
        // Array.from(room.participants.values())
        // // the screenshare participant could be the localParticipant
        // .concat(room.localParticipant)
        // .find(participant =>
        //     Array.from(participant.tracks.values()).find(track =>
        //         track.trackName.includes('screen')
        //     )
        // )
    }

    _handleTrackUnpublished() {

    }

    _handleParticipantDisconnected() {

    }
}