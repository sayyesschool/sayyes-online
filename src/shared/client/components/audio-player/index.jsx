import { forwardRef, useImperativeHandle, useEffect, useRef, useState } from 'react';
import Plyr from 'plyr';
import classnames from 'classnames';

import { defaultI18n } from './constants';

import './index.scss';

const AudioPlayer = forwardRef(function AudioPlayer({
    options = {},
    className,
    ...props
}, ref) {
    const audioRef = useRef();
    const playerRef = useRef();

    const [ready, setReady] = useState(false);

    useImperativeHandle(ref, () => playerRef.current, [ready]);

    useEffect(() => {
        const player = new Plyr(audioRef.current, {
            ...options,
            i18n: defaultI18n
        });

        playerRef.current = player;
        setReady(true);

        return () => {
            player.destroy();
            setReady(false);
        };
    }, []);

    const classNames = classnames(className, 'AudioPlayer');

    return (
        <div className={classNames}>
            <audio ref={audioRef} {...props} />
        </div>
    );
});

export default AudioPlayer;