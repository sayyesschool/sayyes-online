import { useCallback } from 'react';
import {
    IconButton,
    List
} from 'mdc-react';

import { formatDuration } from 'shared/utils/format';

export default function AudioList({ audios, selectedAudio, onSelect, onDelete }) {
    return (
        <List className="audio-list">
            {audios.map(audio =>
                <AudioListItem
                    key={audio}
                    audio={audio}
                    activated={audio === selectedAudio}
                    onClick={onSelect}
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
            end={
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