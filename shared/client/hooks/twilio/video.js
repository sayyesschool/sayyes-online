import { useRef, useEffect } from 'react';
import { createLocalVideoTrack } from 'twilio-video';

export function useLocalVideo() {
    const videoRef = useRef();

    useEffect(() => {
        createLocalVideoTrack()
            .then(track => {
                if (videoRef.current) {
                    track.attach(videoRef.current);
                }
            })
            .catch(error => console.log('ERROR', error));
    }, []);

    return videoRef;
}