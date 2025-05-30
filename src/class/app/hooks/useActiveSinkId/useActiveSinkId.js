import { useCallback, useEffect, useState } from 'react';

import { SELECTED_AUDIO_OUTPUT_KEY } from 'class/constants';
import { useAudioOutputDevices } from 'class/hooks/useDevices';

export default function useActiveSinkId() {
    const audioOutputDevices = useAudioOutputDevices();
    const [activeSinkId, _setActiveSinkId] = useState('default');

    const setActiveSinkId = useCallback(sinkId => {
        window.localStorage.setItem(SELECTED_AUDIO_OUTPUT_KEY, sinkId);
        _setActiveSinkId(sinkId);
    }, []);

    useEffect(() => {
        const selectedSinkId = window.localStorage.getItem(SELECTED_AUDIO_OUTPUT_KEY);
        const hasSelectedAudioOutputDevice = audioOutputDevices.some(
            device => selectedSinkId && device.deviceId === selectedSinkId
        );

        if (hasSelectedAudioOutputDevice) {
            _setActiveSinkId(selectedSinkId);
        }
    }, [audioOutputDevices]);

    return [activeSinkId, setActiveSinkId];
}