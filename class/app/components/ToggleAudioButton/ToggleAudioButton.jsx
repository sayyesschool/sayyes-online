import {
    IconButton,
    Tooltip
} from 'mdc-react';

import useRoomContext from 'app/hooks/useRoomContext';
import useLocalAudioToggle from 'app/hooks/useLocalAudioToggle';

export default function ToggleAudioButton({ disabled }) {
    const { localTracks } = useRoomContext();
    const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();

    const hasAudioTrack = localTracks.some(track => track.kind === 'audio');

    return (
        <Tooltip
            label={!hasAudioTrack ? 'Нет звука' : isAudioEnabled ? 'Выключить микрофон' : 'Включить микрофон'}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
            <span>
                <IconButton
                    icon={isAudioEnabled ? 'mic' : 'mic_off'}
                    disabled={!hasAudioTrack || disabled}
                    onClick={toggleAudioEnabled}
                />
            </span>
        </Tooltip>
    );
}