import { useMemo } from 'react';

import useAppState from 'app/hooks/useAppState';
import { isMobile, removeUndefineds } from 'app/utils';

export default function useConnectionOptions() {
    const { roomType, settings } = useAppState();

    return useMemo(() => {
        // See: https://sdk.twilio.com/js/video/releases/2.0.0/docs/global.html#ConnectOptions for available connection options.
        const connectionOptions = {
            // Bandwidth Profile, Dominant Speaker, and Network Quality
            // features are only available in Small Group or Group Rooms.
            // Please set "Room Type" to "Group" or "Small Group" in your
            // Twilio Console: https://www.twilio.com/console/video/configure
            bandwidthProfile: {
                video: {
                    mode: settings.bandwidthProfileMode,
                    dominantSpeakerPriority: settings.dominantSpeakerPriority,
                    contentPreferencesMode: settings.contentPreferencesMode,
                    clientTrackSwitchOffControl: settings.clientTrackSwitchOffControl,
                    trackSwitchOffMode: settings.trackSwitchOffMode
                }
            },
            dominantSpeaker: true,
            networkQuality: { local: 1, remote: 1 },
            // Comment this line if you are playing music.
            maxAudioBitrate: Number(settings.maxAudioBitrate),
            preferredVideoCodecs: 'auto'
        };

        // For mobile browsers, limit the maximum incoming video bitrate to 2.5 Mbps.
        if (isMobile && connectionOptions?.bandwidthProfile?.video) {
            connectionOptions.bandwidthProfile.video.maxSubscriptionBitrate = 2500000;
        }

        // Here we remove any 'undefined' values. The twilio-video SDK will only use defaults
        // when no value is passed for an option. It will throw an error when 'undefined' is passed.
        return removeUndefineds(connectionOptions);
    }, [roomType, settings]);
}