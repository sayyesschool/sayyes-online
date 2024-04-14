export function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}

export function isPlainObject(o) {
    var ctor, prot;

    if (isObject(o) === false) return false;

    // If has modified constructor
    ctor = o.constructor;
    if (ctor === undefined) return true;

    // If has modified prototype
    prot = ctor.prototype;
    if (isObject(prot) === false) return false;

    // If constructor does not have an Object-specific method
    // eslint-disable-next-line no-prototype-builtins
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
        return false;
    }

    // Most likely a plain Object
    return true;
}

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
            return result.state === 'denied';
        } catch {
            return false;
        }
    } else {
        return false;
    }
}