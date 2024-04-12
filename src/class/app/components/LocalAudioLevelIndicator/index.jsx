import AudioLevelIndicator from 'class/components/AudioLevelIndicator';
import useRoomContext from 'class/hooks/useRoomContext';

export default function LocalAudioLevelIndicator() {
    const { localTracks } = useRoomContext();

    const audioTrack = localTracks.find(track => track.kind === 'audio');

    return (
        <AudioLevelIndicator audioTrack={audioTrack} />
    );
}