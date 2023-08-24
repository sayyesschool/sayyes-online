import { useCallback, useRef } from 'react';

import { IconButton, Tooltip } from 'shared/ui-components';

import useRoomContext from 'app/hooks/useRoomContext';

export default function ToggleVideoButton({ disabled }) {
    const { room, isVideoEnabled } = useRoomContext();

    const lastClickTimeRef = useRef(0);

    const handleClick = useCallback(() => {
        if (Date.now() - lastClickTimeRef.current > 500) {
            lastClickTimeRef.current = Date.now();
            room.toggleVideo();
        }
    }, [room]);

    const hasVideoDevices = room?.video.hasInputDevices;

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
                onClick={handleClick}
            />
        </Tooltip>
    );
}