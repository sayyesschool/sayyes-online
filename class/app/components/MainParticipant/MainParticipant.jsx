import React from 'react';

import useRoomContext from 'app/hooks/useRoomContext';
import useMainParticipant from 'app/hooks/useMainParticipant';
import useSelectedParticipant from 'app/hooks/useSelectedParticipant';
import useScreenShareParticipant from 'app/hooks/useScreenShareParticipant';

import MainParticipantInfo from 'app/components/MainParticipantInfo';
import ParticipantTracks from 'app/components/ParticipantTracks';

export default function MainParticipant() {
    const { room: { localParticipant } } = useRoomContext();
    const mainParticipant = useMainParticipant();
    const [selectedParticipant] = useSelectedParticipant();
    const screenShareParticipant = useScreenShareParticipant();

    const videoPriority =
        (mainParticipant === selectedParticipant || mainParticipant === screenShareParticipant) &&
            mainParticipant !== localParticipant
            ? 'high'
            : null;

    return (
        /* audio is disabled for this participant component because this participant's audio 
           is already being rendered in the <ParticipantStrip /> component.  */
        <MainParticipantInfo participant={mainParticipant}>
            <ParticipantTracks
                participant={mainParticipant}
                videoOnly
                enableScreenShare={mainParticipant !== localParticipant}
                videoPriority={videoPriority}
                isLocalParticipant={mainParticipant === localParticipant}
            />
        </MainParticipantInfo>
    );
}