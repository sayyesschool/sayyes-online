import React, { useRef, useCallback } from 'react';
import {
    IconButton,
    Tooltip
} from 'mdc-react';

import { useHasVideoInputDevices } from 'app/hooks/deviceHooks';
import useLocalVideoToggle from 'app/hooks/useLocalVideoToggle';

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
            label={!hasVideoDevices ? 'Нет видео' : isVideoEnabled ? 'Выключить камеру' : 'Включить камеру'}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
            <span>
                <IconButton
                    icon={isVideoEnabled ? 'videocam' : 'videocam_off'}
                    disabled={!hasVideoDevices || disabled}
                    onClick={toggleVideo}
                />
            </span>
        </Tooltip>
    );
}