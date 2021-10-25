import { forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import Plyr from 'plyr';

import { defaultI18n } from './constants';

import './index.scss';

const AudioPlayer = forwardRef(function AudioPlayer({ options, ...props }, ref) {
    const audioRef = useRef();
    const playerRef = useRef();

    useImperativeHandle(ref, () => playerRef.current);

    useEffect(() => {
        const player = new Plyr(audioRef.current, {
            ...options,
            i18n: defaultI18n
        });

        playerRef.current = player;

        return () => player.destroy();
    }, []);

    return (
        <div className="audio-player">
            <audio ref={audioRef} {...props} />
        </div>
    );
});

AudioPlayer.defaultProps = {
    options: {}
};

export default AudioPlayer;