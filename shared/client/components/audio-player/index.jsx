import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import 'mediaelement';

import './index.scss';

export default forwardRef(AudioPlayer);

function AudioPlayer({ options, ...props }, ref) {
    const audioRef = useRef();
    const playerRef = useRef();

    useImperativeHandle(ref, () => playerRef.current);

    useEffect(() => {
        const player = new MediaElementPlayer(audioRef.current, options);

        playerRef.current = player;

        return () => player.remove();
    }, []);

    return (
        <div className="audio-player">
            <audio ref={audioRef} {...props} />
        </div>
    );
}

AudioPlayer.defaultProps = {
    options: {}
};