import { Button, Tooltip } from '@fluentui/react-northstar';

import Icon from 'shared/ui-components/icon';

import useRoomContext from 'app/hooks/useRoomContext';
import useLocalAudioToggle from 'app/hooks/useLocalAudioToggle';

export default function ToggleAudioButton({ disabled }) {
    const { localTracks } = useRoomContext();
    const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();

    const hasAudioTrack = localTracks.some(track => track.kind === 'audio');

    return (
        <Tooltip
            content={!hasAudioTrack ? 'Нет звука' : isAudioEnabled ? 'Выключить микрофон' : 'Включить микрофон'}
            trigger={
                <Button
                    icon={<Icon>{isAudioEnabled ? 'mic' : 'mic_off'}</Icon>}
                    iconOnly
                    text
                    primary={isAudioEnabled}
                    disabledFocusable={!hasAudioTrack || disabled}
                    onClick={toggleAudioEnabled}
                />
            }
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        />
    );
}