import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import 'mediaelement';

import './index.scss';

export default forwardRef(VideoPlayer);

function VideoPlayer({ options, ...props }, ref) {
    const videoRef = useRef();
    const playerRef = useRef();

    useImperativeHandle(ref, () => playerRef.current);

    useEffect(() => {
        const player = new MediaElementPlayer(videoRef.current, options);

        playerRef.current = player;

        return () => player.remove();
    }, []);

    return (
        <div className="video-player">
            <video ref={videoRef} {...props} />
        </div>
    );
}

VideoPlayer.defaultProps = {
    options: {}
};