import { useEffect, useRef } from 'react';

import useMediaStreamTrack from 'class/hooks/useMediaStreamTrack';
import usePictureInPicture from 'class/hooks/usePictureInPicture';
import useVideoTrackDimensions from 'class/hooks/useVideoTrackDimensions';

export default function VideoTrack({ track, local: isLocal, priority }) {
    const elementRef = useRef(null);

    const mediaStreamTrack = useMediaStreamTrack(track);
    const dimensions = useVideoTrackDimensions(track);
    const [isPictureInPicture] = usePictureInPicture(elementRef);

    useEffect(() => {
        const element = elementRef.current;

        element.muted = true;

        if (track.setPriority && priority) {
            track.setPriority(priority);
        }

        track.attach(element);

        return () => {
            track.detach(element);

            element.srcObject = null;

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
        <video ref={elementRef} className="video" style={style} />
    );
}