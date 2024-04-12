import { useCallback, useEffect, useState } from 'react';

import useLocalVideoToggle from 'class/hooks/useLocalVideoToggle';

export default function usePictureInPicture(videoRef, initialValue) {
    const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();

    const [isPictureInPicture, setPictureInPicture] = useState(initialValue);

    useEffect(() => {
        function handleVisibilityChange() {
            if (document.visibilityState === 'hidden' && isVideoEnabled) {
                setPictureInPicture(true);
            } else {
                setPictureInPicture(false);
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isVideoEnabled, toggleVideoEnabled]);

    const togglePictureInPicture = useCallback(() => {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
            setPictureInPicture(false);
        } else {
            if (document.pictureInPictureEnabled) {
                videoRef.current.requestPictureInPicture();
                setPictureInPicture(true);
            }
        }
    }, []);

    return [isPictureInPicture, togglePictureInPicture];
}