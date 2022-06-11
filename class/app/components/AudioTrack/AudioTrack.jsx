import { useEffect, useRef } from 'react';

import useAppState from 'app/hooks/useAppState';

export default function AudioTrack({ track }) {
    const { activeSinkId } = useAppState();

    const audioRef = useRef();

    useEffect(() => {
        audioRef.current = track.attach();
        audioRef.current.setAttribute('data-cy-audio-track-name', track.name);
        document.body.appendChild(audioRef.current);

        return () => track.detach().forEach(el => el.remove());
    }, [track]);

    useEffect(() => {
        audioRef.current?.setSinkId?.(activeSinkId);
    }, [activeSinkId]);

    return null;
}