import { EventEmitter } from 'events';
import { createLocalAudioTrack } from 'twilio-video';

import { isPermissionDenied } from './utils';

export default class Audio extends EventEmitter {
    _room = null;
    _track = null;
    _inputDevices = [];
    _outputDevices = [];

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

    get hasOutputDevices() {
        return this._outputDevices.length > 0;
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
        navigator.mediaDevices.addEventListener('devicechange', this._handleDeviceChange);

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
        this._track?.start();
    }

    stop() {
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
        this._inputDevices = devices.filter(device => device.kind === 'audioinput');
        this._outputDevices = devices.filter(device => device.kind === 'audiooutput');
    }

    async _setupTrack({ deviceId } = {}) {
        const hasSelectedAudioDevice = this._inputDevices.some(device => device.deviceId === deviceId);
        const isMicrophonePermissionDenied = await isPermissionDenied('microphone');
        const shouldAcquireAudio = this.hasInputDevices && !isMicrophonePermissionDenied;

        const options = shouldAcquireAudio ? {
            // noiseCancellationOptions,
            name: `microphone-${Date.now()}`,
            ...(hasSelectedAudioDevice && {
                deviceId: { exact: deviceId }
            })
        } : undefined;

        this._track = await createLocalAudioTrack(options);
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