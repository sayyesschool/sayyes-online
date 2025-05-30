import { useEffect, useState } from 'react';

export default function useIsTrackSwitchedOff(track) {
    const [isSwitchedOff, setIsSwitchedOff] = useState(track ? track.isSwitchedOff : false);

    useEffect(() => {
        // Reset the value if the 'track' variable changes
        setIsSwitchedOff(track ? track.isSwitchedOff : false);

        if (track) {
            const handleSwitchedOff = () => setIsSwitchedOff(true);
            const handleSwitchedOn = () => setIsSwitchedOff(false);

            // The 'switchedOff' event is emitted when there is not enough bandwidth to support
            // a track. See: https://www.twilio.com/docs/video/tutorials/using-bandwidth-profile-api#understanding-track-switch-offs
            track.on('switchedOff', handleSwitchedOff);
            track.on('switchedOn', handleSwitchedOn);

            return () => {
                track.off('switchedOff', handleSwitchedOff);
                track.off('switchedOn', handleSwitchedOn);
            };
        }
    }, [track]);

    return isSwitchedOff;
}