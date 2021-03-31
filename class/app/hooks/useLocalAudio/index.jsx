import { useCallback } from 'react';

import useRoomContext from 'app/hooks/useRoomContext';

export default function useLocalAudio() {
    const { localTracks } = useRoomContext();
    const audioTrack = localTracks.find(track => track.kind === 'audio');

    const setAudioEnabled = useCallback((shouldEnable = false) => {
        if (shouldEnable) {
            audioTrack.enable();
        } else {
            audioTrack.disable();
        }
    }, [audioTrack]);

    return [audioTrack, setAudioEnabled];
}