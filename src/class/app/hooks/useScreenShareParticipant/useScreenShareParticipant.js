import { useEffect, useState } from 'react';

/**
 * Returns the participant that is sharing their screen (if any).
 * This hook assumes that only one participant can share their screen at a time.
 */
export default function useScreenShareParticipant(room) {
    const [screenShareParticipant, setScreenShareParticipant] = useState();

    useEffect(() => {
        if (room?.state !== 'connected') return;

        function updateScreenShareParticipant() {
            setScreenShareParticipant(
                Array.from(room.participants.values())
                    // the screenshare participant could be the localParticipant
                    .concat(room.localParticipant)
                    .find(participant =>
                        Array.from(participant.tracks.values()).find(track =>
                            track.trackName.includes('screen')
                        )
                    )
            );
        }

        updateScreenShareParticipant();

        room.on('trackPublished', updateScreenShareParticipant);
        room.on('trackUnpublished', updateScreenShareParticipant);
        room.on('participantDisconnected', updateScreenShareParticipant);

        // the room object does not emit 'trackPublished' events for the localParticipant,
        // so we need to listen for them here.
        room.localParticipant.on('trackPublished', updateScreenShareParticipant);
        room.localParticipant.on('trackUnpublished', updateScreenShareParticipant);

        return () => {
            room.off('trackPublished', updateScreenShareParticipant);
            room.off('trackUnpublished', updateScreenShareParticipant);
            room.off('participantDisconnected', updateScreenShareParticipant);

            room.localParticipant.off('trackPublished', updateScreenShareParticipant);
            room.localParticipant.off('trackUnpublished', updateScreenShareParticipant);
        };
    }, [room]);

    return screenShareParticipant;
}