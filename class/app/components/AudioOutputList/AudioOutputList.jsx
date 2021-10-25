import { Select, Typography } from 'mdc-react';

import useAppState from 'app/hooks/useAppState';
import { useAudioOutputDevices } from 'app/hooks/deviceHooks';

export default function AudioOutputList() {
    const { activeSinkId, setActiveSinkId } = useAppState();
    const audioOutputDevices = useAudioOutputDevices();

    const activeOutputLabel = audioOutputDevices.find(device => device.deviceId === activeSinkId)?.label;

    return (
        <div className="audio-output-list">
            <Typography type="subtitle2">Динамики</Typography>

            {audioOutputDevices.length > 1 ?
                <Select
                    value={activeSinkId}
                    filled
                    onChange={e => setActiveSinkId(e.target.value)}
                    options={audioOutputDevices.map(device => ({
                        key: device.deviceId,
                        value: device.deviceId,
                        text: device.label
                    }))}
                />
                :
                <Typography>{activeOutputLabel || 'System Default Audio Output'}</Typography>
            }
        </div>
    );
}
