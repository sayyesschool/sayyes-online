import useRoomContext from 'app/hooks/useRoomContext';

import MainParticipantInfo from 'app/components/MainParticipantInfo';
import ParticipantTracks from 'app/components/ParticipantTracks';

export default function MainParticipant() {
    const {
        localParticipant,
        mainParticipant,
        selectedParticipant,
        screenShareParticipant
    } = useRoomContext();

    const videoPriority = mainParticipant !== localParticipant && (
        mainParticipant === selectedParticipant ||
        mainParticipant === screenShareParticipant
    ) ? 'high' : null;

    return (
        /* audio is disabled for this participant component because this participant's audio is already being rendered in the <ParticipantList /> component.  */
        <MainParticipantInfo participant={mainParticipant}>
            <ParticipantTracks
                participant={mainParticipant}
                local={mainParticipant === localParticipant}
                screenShareEnabled={mainParticipant !== localParticipant}
                videoPriority={videoPriority}
                videoOnly
            />
        </MainParticipantInfo>
    );
}