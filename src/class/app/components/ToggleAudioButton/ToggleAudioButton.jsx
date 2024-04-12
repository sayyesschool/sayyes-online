import { IconButton, Tooltip } from 'shared/ui-components';

import useLocalAudioToggle from 'class/hooks/useLocalAudioToggle';
import useRoomContext from 'class/hooks/useRoomContext';

export default function ToggleAudioButton({ disabled }) {
    const { localTracks } = useRoomContext();
    const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();

    const hasAudioTrack = localTracks.some(track => track.kind === 'audio');

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
                onClick={toggleAudioEnabled}
            />
        </Tooltip>
    );
}