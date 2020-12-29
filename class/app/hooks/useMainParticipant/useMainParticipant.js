import useRoomContext from 'app/hooks/useRoomContext';
import useDominantSpeaker from 'app/hooks/useDominantSpeaker';
import useParticipants from 'app/hooks/useParticipants';
import useScreenShareParticipant from 'app/hooks/useScreenShareParticipant';
import useSelectedParticipant from 'app/hooks//useSelectedParticipant';

export default function useMainParticipant() {
    const { room: { localParticipant } } = useRoomContext();
    const [selectedParticipant] = useSelectedParticipant();
    const screenShareParticipant = useScreenShareParticipant();
    const dominantSpeaker = useDominantSpeaker();
    const participants = useParticipants();

    const remoteScreenShareParticipant = screenShareParticipant !== localParticipant ? screenShareParticipant : null;

    // The participant that is returned is displayed in the main video area. Changing the order of the following
    // variables will change the how the main speaker is determined.
    return selectedParticipant || remoteScreenShareParticipant || dominantSpeaker || participants[0] || localParticipant;
}
