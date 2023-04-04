import { useEffect, useState } from 'react';

export default function useDominantSpeaker(room) {
    const [dominantSpeaker, setDominantSpeaker] = useState(room?.dominantSpeaker);

    useEffect(() => {
        if (room?.state !== 'connected') return;

        // Sometimes, the 'dominantSpeakerChanged' event can emit 'null', which means that
        // there is no dominant speaker. If we change the main participant when 'null' is
        // emitted, the effect can be jarring to the user. Here we ignore any 'null' values
        // and continue to display the previous dominant speaker as the main participant.
        function handleDominantSpeakerChanged(newDominantSpeaker) {
            if (newDominantSpeaker !== null) {
                setDominantSpeaker(newDominantSpeaker);
            }
        }

        // Since 'null' values are ignored, we will need to listen for the 'participantDisconnected'
        // event, so we can set the dominantSpeaker to 'null' when they disconnect.
        function handleParticipantDisconnected(participant) {
            setDominantSpeaker(prevDominantSpeaker => {
                return prevDominantSpeaker === participant ? null : prevDominantSpeaker;
            });
        }

        room.on('dominantSpeakerChanged', handleDominantSpeakerChanged);
        room.on('participantDisconnected', handleParticipantDisconnected);

        return () => {
            room.off('dominantSpeakerChanged', handleDominantSpeakerChanged);
            room.off('participantDisconnected', handleParticipantDisconnected);
        };
    }, [room]);

    return dominantSpeaker;
}