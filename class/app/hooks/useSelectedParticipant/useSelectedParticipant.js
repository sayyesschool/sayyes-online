import { useState, useEffect } from 'react';

import useRoomContext from 'app/hooks/useRoomContext';

export default function useSelectedParticipant() {
    const { room } = useRoomContext();
    const [selectedParticipant, _setSelectedParticipant] = useState(null);

    const setSelectedParticipant = participant =>
        _setSelectedParticipant(prevParticipant => (prevParticipant === participant ? null : participant));

    useEffect(() => {
        const onDisconnect = () => _setSelectedParticipant(null);
        const handleParticipantDisconnected = participant =>
            _setSelectedParticipant(prevParticipant => (prevParticipant === participant ? null : prevParticipant));

        room.on('disconnected', onDisconnect);
        room.on('participantDisconnected', handleParticipantDisconnected);

        return () => {
            room.off('disconnected', onDisconnect);
            room.off('participantDisconnected', handleParticipantDisconnected);
        };
    }, [room]);

    return [selectedParticipant, setSelectedParticipant];
}