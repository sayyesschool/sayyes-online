import classnames from 'shared/utils/classnames';

import Participant from 'class/components/Participant';
import useRoomContext from 'class/hooks/useRoomContext';

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

    const classNames = classnames('ParticipantList', {
        'ParticipantList--transparent-background': !isRemoteParticipantScreenSharing
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