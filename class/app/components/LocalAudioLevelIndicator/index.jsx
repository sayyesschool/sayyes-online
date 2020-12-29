import React from 'react';

import useRoomContext from 'app/hooks/useRoomContext';
import AudioLevelIndicator from 'app/components/AudioLevelIndicator';

export default function LocalAudioLevelIndicator() {
    const { localTracks } = useRoomContext();

    const audioTrack = localTracks.find(track => track.kind === 'audio');

    return (
        <AudioLevelIndicator audioTrack={audioTrack} />
    );
}