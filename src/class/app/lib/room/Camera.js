import { createLocalVideoTrack } from 'twilio-video';

import { isPermissionDenied } from 'app/utils';

export default class Camera {
    devices = [];
    videoTrack = null;

    constructor() {
        this._handleDeviceChange = this.#handleDeviceChange.bind(this);
    }

    get inputDevices() {
        return this.devices.filter(device => device.kind === 'videoinput');
    }

    get hasInputDevices() {
        return this.inputDevices.length > 0;
    }

    async init() {
        await this._setupDevices();
        await this._setupVideoTrack();
        navigator.mediaDevices.addEventListener('devicechange', this.handleDeviceChange);
    }

    stop() {
        this.videoTrack?.stop();
    }

    destroy() {
        navigator.mediaDevices.removeEventListener('devicechange', this.handleDeviceChange);
    }

    _setupDevices() {
        navigator.mediaDevices.enumerateDevices().then(devices => {
            this.devices = devices;
        });
    }

    async _setupVideoTrack({ deviceId } = {}) {
        const hasSelectedVideoDevice = this.videoInputDevices.some(
            device => selectedVideoDeviceId && device.deviceId === deviceId
        );

        const isCameraPermissionDenied = await isPermissionDenied('camera');
        const shouldAcquireVideo = hasVideoInputDevices && !isCameraPermissionDenied;

        const options = {
            ...DEFAULT_VIDEO_CONSTRAINTS,
            name: `camera-${Date.now()}`,
            ...(hasSelectedVideoDevice && { deviceId: { exact: deviceId } })
        };

        createLocalVideoTrack(options)
            .then(videoTrack => {
                this.videoTrack = videoTrack;
            });
    }

    async _handleDeviceChange() {
        await this._setupDevices();
        await this._setupVideoTrack();
    }
}