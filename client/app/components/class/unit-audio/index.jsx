import React, { useRef, useState, useEffect, useCallback } from 'react';

import AudioList from 'app/components/shared/audio-list';

export default function UnitAudio({ course, unit }) {
    const audioRef = useRef();
    const [selectedAudio, setSelectedAudio] = useState();
    const [isPlaying, setPlaying] = useState(false);
    const [duration, setDuration] = useState(false);

    useEffect(() => {
        const audio = new Audio();

        audio.preload = false;

        audio.addEventListener('canplaythrough', () => audio.play());
        audio.addEventListener('play', () => setPlaying(true));
        audio.addEventListener('pause', () => setPlaying(false));
        audio.addEventListener('ended', () => setPlaying(false));
        audio.addEventListener('timeupdate', event => {
            const { currentTime, duration } = event.target;

            setDuration(duration ? `${parseInt(currentTime)} / ${parseInt(duration)}` : '');
        });

        audioRef.current = audio;

        return () => audioRef.current = null;
    }, []);

    useEffect(() => {
        if (!selectedAudio) return;

        audioRef.current.src = `https://static.sayes.ru/courses/${course.slug}/audios/${selectedAudio}.mp3`;
        audioRef.current.load();
    }, [selectedAudio]);

    const handleClick = useCallback(audio => {
        setSelectedAudio(selectedAudio => {
            if (audio !== selectedAudio) {
                return audio;
            } else {
                audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause();
                return selectedAudio;
            }
        });
    }, []);

    return (
        <div className="lesson-audio">
            <AudioList
                audios={unit.audios}
                selectedAudio={selectedAudio}
                playing={isPlaying}
                duration={duration}
                onClick={handleClick}
            />
        </div>
    );
}