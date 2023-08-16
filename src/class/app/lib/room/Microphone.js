import { createLocalAudioTrack } from 'twilio-video';

import { isPermissionDenied } from './utils';

export default class Microphone {
    _audioTrack = null;
    _inputDevices = [];
    _outputDevices = [];

    get audioTrack() {
        return this._audioTrack;
    }

    get hasInputDevices() {
        return this._inputDevices.length > 0;
    }

    get hasOutputDevices() {
        return this._outputDevices.length > 0;
    }

    constructor() {
        this._handleDeviceChange = this._handleDeviceChange.bind(this);
    }

    async init(options) {
        await this._setupDevices();
        await this._setupAudioTrack(options);
        navigator.mediaDevices.addEventListener('devicechange', this.handleDeviceChange);
    }

    stop() {
        this._audioTrack?.stop();
    }

    destroy() {
        navigator.mediaDevices.removeEventListener('devicechange', this.handleDeviceChange);
    }

    async _setupDevices() {
        const devices = await navigator.mediaDevices.enumerateDevices();
        this._inputDevices = devices.filter(device => device.kind === 'audioinput');
        this._outputDevices = devices.filter(device => device.kind === 'audiooutput');
    }

    async _setupAudioTrack({ deviceId } = {}) {
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

        this._audioTrack = await createLocalAudioTrack(options);
        console.log('Audio track', this._audioTrack);
    }

    async _handleDeviceChange() {
        await this._setupDevices();
        await this._setupAudioTrack(options);
    }
}