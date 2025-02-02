import { memo } from 'react';

import AudioTrack from 'class/components/AudioTrack';
import useRoomContext from 'class/hooks/useRoomContext';
import useTracks from 'class/hooks/useTracks';

/*
  This ParticipantAudioTracks component will render the audio track for all participants in the room.
  It is in a separate component so that the audio tracks will always be rendered, and that they will never be
  unnecessarily unmounted/mounted as the user switches between Gallery View and Speaker View.
*/
export default function ParticipantAudioTracks() {
    const { participants } = useRoomContext();

    return participants.map(participant => (
        <Participant
            key={participant.sid}
            participant={participant}
        />
    ));
}

const Participant = memo(function Participant({ participant }) {
    const tracks = useTracks(participant);
    const audioTracks = tracks.filter(track => track.kind === 'audio');

    return audioTracks.map(track =>
        <AudioTrack
            key={track.name}
            track={track}
        />
    );
});