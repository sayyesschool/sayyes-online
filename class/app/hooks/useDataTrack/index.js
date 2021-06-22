import { useState, useEffect } from 'react';
import { LocalDataTrack } from 'twilio-video';

import useRoomContext from 'app/hooks/useRoomContext';

export default function useDataTrack(type) {
    const { room } = useRoomContext();

    const [dataTrack, setDataTrack] = useState();

    useEffect(() => {
        if (type !== 'local') return;

        const localDataTrack = new LocalDataTrack();

        setDataTrack(localDataTrack);
        room.localParticipant.publishTrack(localDataTrack);

        return () => {
            setDataTrack(null);
            room.localParticipant.unpublishTrack(localDataTrack);
        };
    }, [type]);

    useEffect(() => {
        if (type !== 'remote') return;

        room.participants.forEach(participant => {
            const publication = Array.from(participant.dataTracks.values())[0];

            setDataTrack(publication?.track);
        });

        function handleTrackSubscribed(track) {
            if (track?.kind === 'data') {
                setDataTrack(track);
            }
        }

        function handleTrackUnsubscribed(track) {
            if (track?.kind === 'data') {
                setDataTrack(null);
            }
        }

        room.on('trackSubscribed', handleTrackSubscribed);
        room.on('trackUnsubscribed', handleTrackUnsubscribed);

        return () => {
            room.off('trackSubscribed', handleTrackSubscribed);
            room.off('trackUnsubscribed', handleTrackUnsubscribed);
        };
    }, [type]);

    return dataTrack;
}