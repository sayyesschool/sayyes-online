import React, { useRef, useEffect } from 'react';

import useMediaStreamTrack from 'app/hooks/useMediaStreamTrack';
import useVideoTrackDimensions from 'app/hooks/useVideoTrackDimensions';

export default function VideoTrack({ track, isLocal, priority }) {
    const ref = useRef(null);
    const mediaStreamTrack = useMediaStreamTrack(track);
    const dimensions = useVideoTrackDimensions(track);

    useEffect(() => {
        const el = ref.current;

        el.muted = true;

        if (track.setPriority && priority) {
            track.setPriority(priority);
        }

        track.attach(el);

        return () => {
            track.detach(el);

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
        transform: isLocal && isFrontFacing ? 'rotateY(180deg)' : '',
        objectFit: isPortrait || track.name.includes('screen') ? ('contain') : ('cover')
    };

    return (
        <video ref={ref} className="video" style={style} />
    );
}
