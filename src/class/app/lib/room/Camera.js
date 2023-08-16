import { createLocalVideoTrack } from 'twilio-video';

import { isPermissionDenied } from './utils';

export default class Camera {
    _videoTrack = null;
    _inputDevices = [];

    get videoTrack() {
        return this._videoTrack;
    }

    get hasInputDevices() {
        return this._inputDevices.length > 0;
    }

    constructor() {
        this._handleDeviceChange = this._handleDeviceChange.bind(this);
    }

    async init(options) {
        await this._setupDevices();
        await this._setupVideoTrack(options);
        navigator.mediaDevices.addEventListener('devicechange', this.handleDeviceChange);
    }

    stop() {
        this._videoTrack?.stop();
    }

    destroy() {
        navigator.mediaDevices.removeEventListener('devicechange', this.handleDeviceChange);
    }

    async _setupDevices() {
        const devices = await navigator.mediaDevices.enumerateDevices();
        this._inputDevices = devices.filter(device => device.kind === 'videoinput');
    }

    async _setupVideoTrack({ deviceId, ...otherOptions } = {}) {
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

        this._videoTrack = await createLocalVideoTrack(options);
        console.log('Video track', this._videoTrack);
    }

    async _handleDeviceChange() {
        await this._setupDevices();
        await this._setupVideoTrack();
    }
}