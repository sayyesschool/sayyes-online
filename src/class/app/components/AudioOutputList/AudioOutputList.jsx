import { useCallback } from 'react';

import { FormSelect, Text } from 'shared/ui-components';

import useAppState from 'app/hooks/useAppState';
import { useAudioOutputDevices } from 'app/hooks/deviceHooks';

export default function AudioOutputList() {
    const { activeSinkId, setActiveSinkId } = useAppState();
    const audioOutputDevices = useAudioOutputDevices();

    const activeOutputLabel = audioOutputDevices.find(device => device.deviceId === activeSinkId)?.label;

    const handleDeviceChange = useCallback((_, { value }) => {
        setActiveSinkId(value);
    }, [setActiveSinkId]);

    return (
        <div className="audio-output-list">
            {audioOutputDevices.length > 1 ?
                <FormSelect
                    label="Динамики"
                    value={activeSinkId}
                    options={audioOutputDevices.map(device => ({
                        key: device.deviceId,
                        value: device.deviceId,
                        header: device.label
                    }))}
                    onChange={handleDeviceChange}
                />
                :
                <Text>{activeOutputLabel || 'System Default Audio Output'}</Text>
            }
        </div>
    );
}