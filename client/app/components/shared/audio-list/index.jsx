import React, { useCallback } from 'react';
import {
    Icon,
    List
} from 'mdc-react';

export default function AudioList({ audios, selectedAudio, playing, duration, onClick }) {
    return (
        <List className="audio-list">
            {audios.map(audio =>
                <AudioListItem
                    key={audio}
                    audio={audio}
                    playing={audio === selectedAudio && playing}
                    duration={audio === selectedAudio && duration}
                    onClick={onClick}
                />
            )}
        </List>
    );
}

function AudioListItem({ audio, playing, duration, onClick }) {
    const handleClick = useCallback(() => {
        onClick(audio);
    }, []);

    return (
        <List.Item
            graphic={<Icon>{playing ? 'pause' : 'play_arrow'}</Icon>}
            text={`${audio}.mp3`}
            meta={duration}
            activated={playing}
            onClick={handleClick}
        />
    );
}

function formatDuration(seconds) {
    if (seconds === 0) return;

    const duration = moment.duration(seconds, 'seconds');
    const h = duration.hours();
    const m = duration.minutes();
    const s = duration.seconds();
    let result = '';

    if (h) {
        result += `${h}:`;
    }

    result += h ? `${m > 9 ? m : '0' + m}:` : `${m}:`;
    result += s > 9 ? s : `0${s}`;

    return result;
}