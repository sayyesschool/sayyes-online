import { useCallback, useRef, useState } from 'react';

export default function useScreenShareToggle(room, onError) {
    const stopScreenShareRef = useRef(null);

    const [isSharing, setIsSharing] = useState(false);

    const shareScreen = useCallback(() => {
        navigator.mediaDevices
            .getDisplayMedia({
                audio: true,
                video: {
                    frameRate: 24,
                    height: 1080,
                    width: 1920
                }
            })
            .then(stream => {
                const track = stream.getTracks()[0];

                // All video tracks are published with 'low' priority. This works because the video
                // track that is displayed in the 'MainParticipant' component will have it's priority
                // set to 'high' via track.setPriority()
                room.localParticipant
                    .publishTrack(track, {
                        name: 'screen', // Tracks can be named to easily find them later
                        priority: 'low' // Priority is set to high by the subscriber when the video track is rendered
                    })
                    .then(trackPublication => {
                        stopScreenShareRef.current = () => {
                            room.localParticipant.unpublishTrack(track);
                            // TODO: remove this if the SDK is updated to emit this event
                            room.localParticipant.emit('trackUnpublished', trackPublication);
                            track.stop();
                            setIsSharing(false);
                        };

                        track.onended = stopScreenShareRef.current;
                        setIsSharing(true);
                    })
                    .catch(onError);
            })
            .catch(error => {
                // Don't display an error if the user closes the screen share dialog
                if (
                    error.message === 'Permission denied by system' ||
                    (error.name !== 'AbortError' && error.name !== 'NotAllowedError')) {
                    onError(error);
                }
            });
    }, [room, onError]);

    const toggleScreenShare = useCallback(() => {
        if (isSharing) {
            stopScreenShareRef.current();
        } else {
            shareScreen();
        }
    }, [isSharing, shareScreen]);

    return [isSharing, toggleScreenShare];
}