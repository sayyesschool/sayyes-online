import { IconButton, Tooltip } from 'shared/ui-components';

import useRoomContext from 'app/hooks/useRoomContext';
import useLocalAudioToggle from 'app/hooks/useLocalAudioToggle';

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