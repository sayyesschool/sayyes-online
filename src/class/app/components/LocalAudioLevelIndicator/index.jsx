import useRoomContext from 'app/hooks/useRoomContext';
import AudioLevelIndicator from 'app/components/AudioLevelIndicator';

export default function LocalAudioLevelIndicator() {
    const { room } = useRoomContext();

    const audioTrack = room?.audio.track;

    return (
        <AudioLevelIndicator audioTrack={audioTrack} />
    );
}