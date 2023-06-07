import { createLocalAudioTrack } from 'twilio-video';

import { isPermissionDenied } from 'app/utils';

export default class Microphone {
    devices = [];
    audioTrack = null;

    constructor() {
        this._handleDeviceChange = this.#handleDeviceChange.bind(this);
    }

    get inputDevices() {
        return this.devices.filter(device => device.kind === 'audioinput');
    }

    get outputDevices() {
        return this.devices.filter(device => device.kind === 'audiooutput');
    }

    get hasInputDevices() {
        return this.inputDevices.length > 0;
    }

    async init(options) {
        await this._setupDevices();
        await this._setupAudioTrack(options);
        navigator.mediaDevices.addEventListener('devicechange', this.handleDeviceChange);
    }

    stop() {
        this.audioTrack?.stop();
    }

    destroy() {
        navigator.mediaDevices.removeEventListener('devicechange', this.handleDeviceChange);
    }

    _setupDevices() {
        navigator.mediaDevices.enumerateDevices().then(devices => {
            this.devices = devices;
        });
    }

    async _setupAudioTrack({ deviceId } = {}) {
        const options = {};
        const isMicrophonePermissionDenied = await isPermissionDenied('microphone');
        const shouldAcquireAudio = this.hasInputDevices && !isMicrophonePermissionDenied;

        if (deviceId) {
            options.deviceId = { exact: deviceId };
        }

        createLocalAudioTrack(options)
            .then(audioTrack => {
                this.audioTrack = audioTrack;
            });
    }

    async _handleDeviceChange() {
        await this._setupDevices();
        await this._setupAudioTrack(options);
    }
}