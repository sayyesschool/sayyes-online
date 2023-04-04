import { useEffect, useState } from 'react';

export default function useTracks(participant) {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const subscribedTracks = Array.from(participant.tracks.values())
            .filter(trackPublication => trackPublication.track !== null)
            .map(trackPublication => trackPublication.track);

        setTracks(subscribedTracks);

        function handleTrackSubscribed(track) {
            setTracks(prevTracks => [...prevTracks, track]);
        }

        function handleTrackUnsubscribed(track) {
            setTracks(prevTracks => prevTracks.filter(t => t !== track));
        }

        participant.on('trackSubscribed', handleTrackSubscribed);
        participant.on('trackUnsubscribed', handleTrackUnsubscribed);

        return () => {
            participant.off('trackSubscribed', handleTrackSubscribed);
            participant.off('trackUnsubscribed', handleTrackUnsubscribed);
        };
    }, [participant]);

    return tracks;
}