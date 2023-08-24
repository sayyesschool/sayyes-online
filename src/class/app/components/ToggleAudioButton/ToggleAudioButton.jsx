import { useCallback } from 'react';

import { IconButton, Tooltip } from 'shared/ui-components';

import useRoomContext from 'app/hooks/useRoomContext';

export default function ToggleAudioButton({ disabled }) {
    const { room, isAudioEnabled } = useRoomContext();

    const hasAudioTrack = room?.audio.track;

    const handleClick = useCallback(() => {
        room.toggleAudio();
    }, [room]);

    return (
        <Tooltip
            content={!hasAudioTrack ? 'Нет звука' : isAudioEnabled ? 'Выключить микрофон' : 'Включить микрофон'}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
            <IconButton
                icon={isAudioEnabled ? 'mic' : 'mic_off'}
                color={isAudioEnabled ? 'primary' : 'neutral'}
                variant={isAudioEnabled ? 'soft' : 'plain'}
                size="sm"
                disabled={!hasAudioTrack || disabled}
                onClick={handleClick}
            />
        </Tooltip>
    );
}