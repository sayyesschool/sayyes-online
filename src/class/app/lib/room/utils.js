export async function getDeviceInfo() {
    const devices = await navigator.mediaDevices.enumerateDevices();

    return {
        audioInputDevices: devices.filter(device => device.kind === 'audioinput'),
        videoInputDevices: devices.filter(device => device.kind === 'videoinput'),
        audioOutputDevices: devices.filter(device => device.kind === 'audiooutput'),
        hasAudioInputDevices: devices.some(device => device.kind === 'audioinput'),
        hasVideoInputDevices: devices.some(device => device.kind === 'videoinput')
    };
}

export async function isPermissionDenied(name) {
    const permissionName = name; // workaround for https://github.com/microsoft/TypeScript/issues/33923

    if (navigator.permissions) {
        try {
            const result = await navigator.permissions.query({ name: permissionName });
            return result.state === 'denied';
        } catch {
            return false;
        }
    } else {
        return false;
    }
}