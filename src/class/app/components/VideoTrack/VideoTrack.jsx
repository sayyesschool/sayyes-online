import { useEffect, useRef } from 'react';

import useMediaStreamTrack from 'app/hooks/useMediaStreamTrack';
import useVideoTrackDimensions from 'app/hooks/useVideoTrackDimensions';
import usePictureInPicture from 'app/hooks/usePictureInPicture';

export default function VideoTrack({ track, local: isLocal, priority }) {
    const videoElementRef = useRef(null);

    const mediaStreamTrack = useMediaStreamTrack(track);
    const dimensions = useVideoTrackDimensions(track);
    //const [isPictureInPicture] = usePictureInPicture(elementRef);
    const isPictureInPicture = false;

    useEffect(() => {
        const videoElement = videoElementRef.current;

        videoElement.muted = true;

        if (track.setPriority && priority) {
            track.setPriority(priority);
        }

        track.attach(videoElement);

        return () => {
            track.detach(videoElement);

            videoElement.srcObject = null;

            if (track.setPriority && priority) {
                // Passing `null` to setPriority will set the track's priority to that which it was published with.
                track.setPriority(null);
            }
        };
    }, [track, priority]);

    // The local video track is mirrored if it is not facing the environment.
    const isPortrait = (dimensions?.height ?? 0) > (dimensions?.width ?? 0);
    const isFrontFacing = mediaStreamTrack?.getSettings().facingMode !== 'environment';
    const style = {
        transform: (isLocal && isFrontFacing && !isPictureInPicture) ? 'rotateY(180deg)' : '',
        objectFit: isPortrait || track.name.includes('screen') ? ('contain') : ('cover')
    };

    return (
        <video ref={videoElementRef} className="video" style={style} />
    );
}