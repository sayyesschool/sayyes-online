import { useCallback } from 'react';
import {
    Button,
    List
} from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';
import { formatDuration } from 'shared/utils/format';

import './index.scss';

export default function AudioList({ audios, selectedAudio, onSelect, onDelete }) {
    return (
        <List className="audio-list">
            {audios.map(audio =>
                <AudioListItem
                    key={audio.id}
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
            header={audio.title}
            content={formatDuration(audio.duration)}
            endMedia={
                <Button
                    icon={<Icon>delete</Icon>}
                    iconOnly
                    text
                    onClickCapture={handleDelete}
                />
            }
            activated={playing}
            onClick={handleClick}
            {...props}
        />
    );
}