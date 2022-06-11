import ParticipantInfo from 'app/components/ParticipantInfo';
import ParticipantTracks from 'app/components/ParticipantTracks';

export default function Participant({
    participant,
    videoOnly,
    local,
    hidden,
    selected,
    screenShareEnabled,
    onClick
}) {
    return (
        <ParticipantInfo
            participant={participant}
            local={local}
            hidden={hidden}
            selected={selected}
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
}