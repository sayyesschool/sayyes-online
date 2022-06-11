import classnames from 'classnames';

import useRoomContext from 'app/hooks/useRoomContext';
import Participant from 'app/components/Participant';

export default function ParticipantList() {
    const {
        localParticipant,
        mainParticipant,
        participants,
        selectedParticipant,
        screenShareParticipant,
        setSelectedParticipant
    } = useRoomContext();

    if (participants.length === 0) return null;

    const isRemoteParticipantScreenSharing = screenShareParticipant && screenShareParticipant !== localParticipant;

    const classNames = classnames('participant-list', {
        'participant-list--transparent-background': !isRemoteParticipantScreenSharing
    });

    return (
        <div className={classNames}>
            <Participant
                participant={localParticipant}
                local
            />

            {participants.map(participant => {
                const selected = participant === selectedParticipant;
                const hidden = (
                    !selected &&
                    participant === mainParticipant &&
                    participant !== screenShareParticipant
                );

                return (
                    <Participant
                        key={participant.sid}
                        participant={participant}
                        hidden={hidden}
                        selected={selected}
                        onClick={() => setSelectedParticipant(participant)}
                    />
                );
            })}
        </div>
    );
}