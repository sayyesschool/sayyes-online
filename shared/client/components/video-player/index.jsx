import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import Plyr from 'plyr';
import classnames from 'classnames';

import './index.scss';

export default forwardRef(VideoPlayer);

const defaultControls = [
    'play-large', // The large play button in the center
    'play', // Play/pause playback
    'rewind', // Rewind by the seek time (default 10 seconds)
    'fast-forward', // Fast forward by the seek time (default 10 seconds)
    'progress', // The progress bar and scrubber for playback and buffering
    'current-time', // The current time of playback
    'duration', // The full duration of the media
    'mute', // Toggle mute
    'volume', // Volume control
    'settings', // Settings menu
    'pip', // Picture-in-picture
    'fullscreen', // Toggle fullscreen
];

const defaultI18n = {
    restart: 'Играть заново',
    rewind: 'Назад на {seektime} сек',
    play: 'Играть',
    pause: 'Пауза',
    fastForward: 'Вперед на {seektime} сек',
    seek: 'Найти',
    played: 'Проиграно',
    buffered: 'Buffered',
    currentTime: 'Текущее время',
    duration: 'Продолжительность',
    volume: 'Звук',
    mute: 'Выключить звук',
    unmute: 'Включить звук',
    enableCaptions: 'Включить субтитры',
    disableCaptions: 'Отключить субтитры',
    enterFullscreen: 'Включить полноэкранный режим',
    exitFullscreen: 'Выйти из полноэкранного режима',
    frameTitle: 'Плеер для {title}',
    captions: 'Субтитры',
    settings: 'Настройки',
    speed: 'Скорость',
    normal: 'Нормальная',
    quality: 'Качество',
    loop: 'Повтора',
    start: 'Начало',
    end: 'Конец',
    all: 'Все',
    reset: 'Reset',
    disabled: 'Отключено',
    advertisement: 'Реклама',
};

function VideoPlayer({ src, provider, options = {}, ...props }, ref) {
    const videoRef = useRef();
    const playerRef = useRef();

    useImperativeHandle(ref, () => playerRef.current);

    useEffect(() => {
        const player = new Plyr(videoRef.current, {
            ...options,
            i18n: defaultI18n
        });

        playerRef.current = player;

        return () => player.destroy();
    }, []);

    return (
        <div className={classnames('video-player', { 'plyr__video-embed': provider !== 'server' })}>
            {provider === 'server' ?
                <video ref={videoRef} src={src} {...props} />
                :
                <iframe src={src} allowFullScreen allowTransparency allow="autoplay" />
            }
        </div>
    );
}