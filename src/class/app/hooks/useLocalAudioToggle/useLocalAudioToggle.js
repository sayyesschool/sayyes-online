import { useCallback } from 'react';

import useRoomContext from 'app/hooks/useRoomContext';
import useIsTrackEnabled from 'app/hooks/useIsTrackEnabled';

export default function useLocalAudioToggle() {
    const { audioTrack } = useRoomContext();
    const isEnabled = useIsTrackEnabled(audioTrack);

    const toggleAudioEnabled = useCallback(() => {
        if (audioTrack) {
            audioTrack.isEnabled ? audioTrack.disable() : audioTrack.enable();
        }
    }, [audioTrack]);

    return [isEnabled, toggleAudioEnabled];
}