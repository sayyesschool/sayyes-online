import { useCallback } from 'react';
import {
    IconButton,
    List
} from 'mdc-react';

import { formatDuration } from 'shared/utils/format';

export default function AudioList({ audios, selectedAudio, onClick, onDelete }) {
    return (
        <List className="audio-list">
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
            icon="audiotrack"
            primaryText={audio.title}
            secondaryText={formatDuration(audio.duration)}
            trailingIcon={
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