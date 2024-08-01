import { useCallback, useRef } from 'react';

import { IconButton, Tooltip } from 'shared/ui-components';

import { useHasVideoInputDevices } from 'class/hooks/useDevices';
import useLocalVideoToggle from 'class/hooks/useLocalVideoToggle';

export default function ToggleVideoButton({ disabled }) {
    const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
    const hasVideoDevices = useHasVideoInputDevices();

    const lastClickTimeRef = useRef(0);

    const toggleVideo = useCallback(() => {
        if (Date.now() - lastClickTimeRef.current > 500) {
            lastClickTimeRef.current = Date.now();
            toggleVideoEnabled();
        }
    }, [toggleVideoEnabled]);

    return (
        <Tooltip
            content={!hasVideoDevices ? 'Нет видео' : isVideoEnabled ? 'Выключить камеру' : 'Включить камеру'}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
            <IconButton
                icon={isVideoEnabled ? 'videocam' : 'videocam_off'}
                color={isVideoEnabled ? 'primary' : 'neutral'}
                variant={isVideoEnabled ? 'soft' : 'plain'}
                size="sm"
                disabled={!hasVideoDevices || disabled}
                onClick={toggleVideo}
            />
        </Tooltip>
    );
}