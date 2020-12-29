import React from 'react';

import ParticipantInfo from 'app/components/ParticipantInfo';
import ParticipantTracks from 'app/components/ParticipantTracks';

export default function Participant({
    participant,
    videoOnly,
    enableScreenShare,
    onClick,
    isSelected,
    isLocalParticipant,
    hideParticipant,
}) {
    return (
        <ParticipantInfo
            participant={participant}
            onClick={onClick}
            isSelected={isSelected}
            isLocalParticipant={isLocalParticipant}
            hideParticipant={hideParticipant}
        >
            <ParticipantTracks
                participant={participant}
                videoOnly={videoOnly}
                enableScreenShare={enableScreenShare}
                isLocalParticipant={isLocalParticipant}
            />
        </ParticipantInfo>
    );
}
