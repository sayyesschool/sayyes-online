import { useCallback } from 'react';

import useIsTrackEnabled from 'class/hooks/useIsTrackEnabled';
import useRoomContext from 'class/hooks/useRoomContext';

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