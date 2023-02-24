import { useCallback, useRef } from 'react';

import { Button, Icon, Tooltip } from 'shared/ui-components';

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
            content={!hasVideoDevices ? 'Нет видео' : isVideoEnabled ? 'Выключить камеру' : 'Включить камеру'}
            trigger={
                <Button
                    icon={<Icon>{isVideoEnabled ? 'videocam' : 'videocam_off'}</Icon>}
                    iconOnly
                    text
                    primary={isVideoEnabled}
                    disabledFocusable={!hasVideoDevices || disabled}
                    onClick={toggleVideo}
                />
            }
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        />
    );
}