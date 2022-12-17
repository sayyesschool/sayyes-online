import useParticipants from 'app/hooks/useParticipants';
import useTracks from 'app/hooks/useTracks';
import AudioTrack from 'app/components/AudioTrack/AudioTrack';

/*
  This ParticipantAudioTracks component will render the audio track for all participants in the room.
  It is in a separate component so that the audio tracks will always be rendered, and that they will never be 
  unnecessarily unmounted/mounted as the user switches between Gallery View and Speaker View.
*/
export default function ParticipantAudioTracks() {
    const participants = useParticipants();

    return participants.map(participant => (
        <Participant
            key={participant.sid}
            participant={participant}
        />
    ));
}

function Participant({ participant }) {
    const tracks = useTracks(participant);
    const audioTrack = tracks.find(track => track.kind === 'audio');

    if (audioTrack?.kind === 'audio') return <AudioTrack track={audioTrack} />;

    return null;
}