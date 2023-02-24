import { useCallback } from 'react';

import useRoomContext from 'app/hooks/useRoomContext';
import useIsTrackEnabled from 'app/hooks/useIsTrackEnabled';

export default function useLocalAudioToggle() {
    const { localTracks } = useRoomContext();
    const audioTrack = localTracks.find(track => track.kind === 'audio');
    const isEnabled = useIsTrackEnabled(audioTrack);

    const toggleAudioEnabled = useCallback(() => {
        if (audioTrack) {
            audioTrack.isEnabled ? audioTrack.disable() : audioTrack.enable();
        }
    }, [audioTrack]);

    return [isEnabled, toggleAudioEnabled];
}