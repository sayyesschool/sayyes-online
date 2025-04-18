export const initialSettings = {
    bandwidthProfileMode: 'collaboration',
    clientTrackSwitchOffControl: 'auto',
    contentPreferencesMode: 'auto',
    dominantSpeakerPriority: 'standard',
    maxAudioBitrate: '16000',
    trackSwitchOffMode: undefined
};

// This inputLabels object is used by ConnectionOptions.tsx. It is used to populate the id, name, and label props
// of the various input elements. Using a typed object like this (instead of strings) eliminates the possibility
// of there being a typo.
export const inputLabels = (() => {
    const target = {};

    for (const setting in initialSettings) {
        target[setting] = setting;
    }

    return target;
})();

export const RenderDimensions = [
    {
        label: 'Low (160 x 90)',
        value: 'low',
        resolution: { width: 160, height: 90 }
    },
    {
        label: 'CIF (352 x 288)',
        value: 'cif',
        resolution: { width: 352, height: 288 }
    },
    {
        label: 'VGA (640 x 480)',
        value: 'vga',
        resolution: { width: 640, height: 480 }
    },
    {
        label: 'WVGA (800 x 480)',
        value: 'wvga',
        resolution: { width: 800, height: 480 }
    },
    {
        label: 'HD 540P (960 x 540)',
        value: '540p',
        resolution: { width: 960, height: 540 }
    },
    {
        label: 'HD 720P (1280 x 720)',
        value: '720p',
        resolution: { width: 1280, height: 720 }
    },
    {
        label: 'HD 960P (1280 x 960)',
        value: '960p',
        resolution: { width: 1280, height: 960 }
    },
    {
        label: 'HD Standard 1080P (1440 x 1080)',
        value: 'standard1080p',
        resolution: { width: 1440, height: 1080 }
    },
    {
        label: 'HD Widescreen 1080P (1920 x 1080)',
        value: 'wide1080p',
        resolution: { width: 1920, height: 1080 }
    },
    {
        label: 'Server Default',
        value: 'default',
        resolution: undefined
    }
];

export function getResolution(value) {
    if (typeof value === 'undefined') {
        return undefined;
    }

    return RenderDimensions.find(item => item.value === value)?.resolution;
}