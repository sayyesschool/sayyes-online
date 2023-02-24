import { useCallback, useEffect, useState } from 'react';

export default function useSelectedParticipant(room) {
    const [selectedParticipant, _setSelectedParticipant] = useState(null);

    const setSelectedParticipant = useCallback(participant => {
        _setSelectedParticipant(prevParticipant => prevParticipant === participant ? null : participant);
    }, []);

    useEffect(() => {
        if (room?.state !== 'connected') return;

        function handleDisconnect() {
            _setSelectedParticipant(null);
        }

        function handleParticipantDisconnected(participant) {
            _setSelectedParticipant(prevParticipant => prevParticipant === participant ? null : prevParticipant);
        }

        room.on('disconnected', handleDisconnect);
        room.on('participantDisconnected', handleParticipantDisconnected);

        return () => {
            room.off('disconnected', handleDisconnect);
            room.off('participantDisconnected', handleParticipantDisconnected);
        };
    }, [room]);

    return [selectedParticipant, setSelectedParticipant];
}