import { useEffect, useState } from 'react';

export default function useParticipants(room, dominantSpeaker) {
    const [participants, setParticipants] = useState([]);

    // When the dominant speaker changes, they are moved to the front of the participants array.
    // This means that the most recent dominant speakers will always be near the top of the
    // ParticipantStrip component.
    useEffect(() => {
        if (dominantSpeaker) {
            setParticipants(prevParticipants => [
                dominantSpeaker,
                ...prevParticipants.filter(participant => participant !== dominantSpeaker)
            ]);
        }
    }, [dominantSpeaker]);

    useEffect(() => {
        if (room?.state !== 'connected') return;

        function participantConnected(participant) {
            setParticipants(prevParticipants => [...prevParticipants, participant]);
        }

        function participantDisconnected(participant) {
            setParticipants(prevParticipants => prevParticipants.filter(p => p !== participant));
        }

        setParticipants(Array.from(room.participants.values()));

        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);

        return () => {
            room.off('participantConnected', participantConnected);
            room.off('participantDisconnected', participantDisconnected);
        };
    }, [room]);

    return participants;
}