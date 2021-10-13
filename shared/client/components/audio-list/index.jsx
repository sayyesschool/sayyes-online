import React, { useCallback } from 'react';
import {
    Icon,
    IconButton,
    List
} from 'mdc-react';

import { formatDuration } from 'shared/utils/format';

export default function AudioList({ audios, selectedAudio, onClick, onDelete }) {
    return (
        <List className="audio-list" twoLine>
            {audios.map(audio =>
                <AudioListItem
                    key={audio}
                    audio={audio}
                    activated={audio === selectedAudio}
                    onClick={onClick}
                    onDelete={onDelete}
                />
            )}
        </List>
    );
}

function AudioListItem({ audio, playing, onClick, onDelete, ...props }) {
    const handleClick = useCallback(() => {
        onClick(audio);
    }, [onClick]);

    const handleDelete = useCallback(event => {
        event.stopPropagation();

        onDelete(audio);
    }, [onDelete]);

    return (
        <List.Item
            primaryText={audio.title}
            secondaryText={formatDuration(audio.duration)}
            graphic={<Icon>audiotrack</Icon>}
            meta={
                <IconButton
                    icon="delete"
                    onClickCapture={handleDelete}
                />
            }
            activated={playing}
            onClick={handleClick}
            {...props}
        />
    );
}