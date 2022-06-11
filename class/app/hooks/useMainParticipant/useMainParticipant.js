import useRoomContext from 'app/hooks/useRoomContext';

/**
 * Returns the participant that is displayed in the main video area.
 */
export default function useMainParticipant() {
    const {
        localParticipant,
        participants,
        dominantSpeaker,
        selectedParticipant,
        screenShareParticipant
    } = useRoomContext();

    const remoteScreenShareParticipant = screenShareParticipant !== localParticipant ? screenShareParticipant : null;

    // Changing the order of the following variables will change the how the main speaker is determined.
    const mainParticipant = selectedParticipant || remoteScreenShareParticipant || dominantSpeaker || participants[0] || localParticipant;

    return mainParticipant;
}