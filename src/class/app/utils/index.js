import isPlainObject from 'is-plain-object';

export const isMobile = (() => {
    if (typeof navigator === 'undefined' || typeof navigator.userAgent !== 'string') {
        return false;
    }

    return /Mobile/.test(navigator.userAgent);
})();

// Recursively removes any object keys with a value of undefined
export function removeUndefineds(obj) {
    if (!isPlainObject(obj)) return obj;

    const target = {};

    for (const key in obj) {
        const val = obj[key];

        if (typeof val !== 'undefined') {
            target[key] = removeUndefineds(val);
        }
    }

    return target;
}

export function formatTime(ms = 0) {
    const min = parseInt(ms / 60000);
    const sec = parseInt((ms / 1000) % 60);

    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}

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
            const result = await navigator.permissions.query({
                name: permissionName
            });
            console.log('PERMISSION', result);
            return result.state === 'denied';
        } catch {
            return false;
        }
    } else {
        return false;
    }
}