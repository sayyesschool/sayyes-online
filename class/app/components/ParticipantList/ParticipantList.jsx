import classnames from 'classnames';

import useRoomContext from 'app/hooks/useRoomContext';
import useParticipants from 'app/hooks/useParticipants';
import useMainParticipant from 'app/hooks/useMainParticipant';
import useSelectedParticipant from 'app/hooks/useSelectedParticipant';
import useScreenShareParticipant from 'app/hooks/useScreenShareParticipant';
import Participant from 'app/components/Participant';

export default function ParticipantList() {
    const { room: { localParticipant } } = useRoomContext();
    const participants = useParticipants();
    const mainParticipant = useMainParticipant();
    const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();
    const screenShareParticipant = useScreenShareParticipant();

    const isRemoteParticipantScreenSharing = screenShareParticipant && screenShareParticipant !== localParticipant;

    if (participants.length === 0) return null;

    return (
        <aside
            className={classnames('participant-list', {
                'participant-list--transparent-background': !isRemoteParticipantScreenSharing,
            })}
        >
            <div className="participant-list__scroll-container">
                <Participant
                    participant={localParticipant}
                    isLocalParticipant={true}
                />

                {participants.map(participant => {
                    const isSelected = participant === selectedParticipant;
                    const hideParticipant = (
                        participant === mainParticipant &&
                        participant !== screenShareParticipant &&
                        !isSelected
                    );

                    return (
                        <Participant
                            key={participant.sid}
                            participant={participant}
                            isSelected={participant === selectedParticipant}
                            onClick={() => setSelectedParticipant(participant)}
                            hideParticipant={hideParticipant}
                        />
                    );
                })}
            </div>
        </aside>
    );
}