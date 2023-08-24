import { EventEmitter } from 'events';
import { createLocalVideoTrack } from 'twilio-video';

import { isPermissionDenied } from './utils';

export default class Video extends EventEmitter {
    _room = null;
    _track = null;
    _inputDevices = [];
    _isPublishing = false;

    get track() {
        return this._track;
    }

    get inputDevices() {
        return this._inputDevices;
    }

    get isEnabled() {
        return this._track?.isEnabled;
    }

    get isStarted() {
        return this._track?.isStarted;
    }

    get hasInputDevices() {
        return this._inputDevices.length > 0;
    }

    constructor(room) {
        super();

        this._room = room;

        this._handleDeviceChange = this._handleDeviceChange.bind(this);
        this._handleTrackStarted = this._handleTrackStarted.bind(this);
        this._handleTrackStopped = this._handleTrackStopped.bind(this);
        this._handleTrackEnabled = this._handleTrackEnabled.bind(this);
        this._handleTrackDisabled = this._handleTrackDisabled.bind(this);
        this._handleError = this._handleError.bind(this);
    }

    async init(options) {
        navigator.mediaDevices.addEventListener('devicechange', this.handleDeviceChange);

        await this._setupDevices();
        await this._setupTrack(options);

        this._track?.on('started', this._handleTrackStarted);
        this._track?.on('stopped', this._handleTrackStopped);
        this._track?.on('enabled', this._handleTrackEnabled);
        this._track?.on('disabled', this._handleTrackDisabled);
    }

    destroy() {
        navigator.mediaDevices.removeEventListener('devicechange', this._handleDeviceChange);

        this._track?.off('started', this._handleTrackStarted);
        this._track?.off('stopped', this._handleTrackStopped);
        this._track?.off('enabled', this._handleTrackEnabled);
        this._track?.off('disabled', this._handleTrackDisabled);
    }

    start() {
        if (this._isPublishing) return;

        this._isPublishing = true;

        this._room.localParticipant.publishTrack(this._track, { priority: 'low' })
            .catch(this._handleError)
            .finally(() => {
                this._isPublishing = false;
            });
    }

    stop() {
        if (this._isPublishing) return;

        const localTrackPublication = localParticipant?.unpublishTrack(videoTrack);
        // TODO: remove when SDK implements this event. See: https://issues.corp.twilio.com/browse/JSDK-2592
        this._room.localParticipant?.emit('trackUnpublished', localTrackPublication);
        this._track?.stop();
    }

    enable() {
        this._track?.enable();
    }

    disable() {
        this._track?.disable();
    }

    toggle() {
        if (this.isEnabled)
            this.disable();
        else
            this.enable();
    }

    async _setupDevices() {
        const devices = await navigator.mediaDevices.enumerateDevices();
        this._inputDevices = devices.filter(device => device.kind === 'videoinput');
    }

    async _setupTrack({ deviceId, ...otherOptions } = {}) {
        const hasSelectedVideoDevice = this._inputDevices.some(device => device.deviceId === deviceId);
        const isCameraPermissionDenied = await isPermissionDenied('camera');
        const shouldAcquireVideo = this.hasInputDevices && !isCameraPermissionDenied;

        const options = shouldAcquireVideo ? {
            name: `camera-${Date.now()}`,
            ...otherOptions,
            ...(hasSelectedVideoDevice && {
                deviceId: { exact: deviceId }
            })
        } : undefined;

        this._track = await createLocalVideoTrack(options);
    }

    async _handleDeviceChange() {
        await this._setupDevices();
        await this._setupTrack();
        this.emit('deviceChanged');
    }

    _handleTrackStarted() {
        this.emit('started');
    }

    _handleTrackStopped() {
        this.emit('stopped');
    }

    _handleTrackEnabled() {
        this.emit('enabled');
    }

    _handleTrackDisabled() {
        this.emit('disabled');
    }

    _handleError(error) {
        this.emit('error', error);
    }
}