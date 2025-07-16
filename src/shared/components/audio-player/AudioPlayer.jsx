import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import Plyr from 'plyr';

import classnames from 'shared/utils/classnames';

import { defaultI18n } from './constants';

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
            i18n: defaultI18n,
            speed: {
                selected: 1,
                options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
            }
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