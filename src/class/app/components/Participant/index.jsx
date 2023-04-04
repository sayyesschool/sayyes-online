import { memo } from 'react';

import ParticipantInfo from 'app/components/ParticipantInfo';
import ParticipantTracks from 'app/components/ParticipantTracks';

export default memo(function Participant({
    participant,
    local,
    hidden,
    selected,
    dominantSpeaker,
    videoOnly,
    screenShareEnabled,
    onClick
}) {
    return (
        <ParticipantInfo
            participant={participant}
            local={local}
            hidden={hidden}
            selected={selected}
            dominantSpeaker={dominantSpeaker}
            onClick={onClick}
        >
            <ParticipantTracks
                participant={participant}
                local={local}
                videoOnly={videoOnly}
                screenShareEnabled={screenShareEnabled}
            />
        </ParticipantInfo>
    );
});