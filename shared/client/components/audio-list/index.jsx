import React, { useCallback } from 'react';
import {
    Icon,
    List
} from 'mdc-react';

export default function AudioList({ audios, selectedAudio, onClick }) {
    return (
        <List className="audio-list">
            {audios.map(audio =>
                <AudioListItem
                    key={audio}
                    audio={audio}
                    activated={audio === selectedAudio}
                    onClick={onClick}
                />
            )}
        </List>
    );
}

function AudioListItem({ audio, playing, onClick, ...props }) {
    const handleClick = useCallback(() => {
        onClick(audio);
    }, []);

    return (
        <List.Item
            text={audio.title}
            graphic={<Icon>audiotrack</Icon>}
            meta={audio.duration}
            activated={playing}
            onClick={handleClick}
            {...props}
        />
    );
}