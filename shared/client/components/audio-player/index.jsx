import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import Plyr from 'plyr';

import './index.scss';

export default forwardRef(AudioPlayer);

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

function AudioPlayer({ options, ...props }, ref) {
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
}

AudioPlayer.defaultProps = {
    options: {}
};