import { useCallback, useState } from 'react';

import { FormSelect, Text } from 'shared/ui-components';

import { DEFAULT_VIDEO_CONSTRAINTS, SELECTED_VIDEO_INPUT_KEY } from 'app/constants';
import useRoomContext from 'app/hooks/useRoomContext';
import useMediaStreamTrack from 'app/hooks/useMediaStreamTrack';
import { useVideoInputDevices } from 'app/hooks/useDevices';
import VideoTrack from 'app/components/VideoTrack';

export default function VideoInputList() {
    const { localTracks } = useRoomContext();
    const videoInputDevices = useVideoInputDevices();

    const localVideoTrack = localTracks.find(track => track.kind === 'video');
    const mediaStreamTrack = useMediaStreamTrack(localVideoTrack);
    const [storedLocalVideoDeviceId, setStoredLocalVideoDeviceId] = useState(
        window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY)
    );
    const localVideoInputDeviceId = mediaStreamTrack?.getSettings().deviceId || storedLocalVideoDeviceId;

    const handleDeviceChange = useCallback((_, { value: newDeviceId }) => {
        // Here we store the device ID in the component state. This is so we can re-render this component display
        // to display the name of the selected device when it is changed while the users camera is off.
        setStoredLocalVideoDeviceId(newDeviceId);
        window.localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, newDeviceId);

        if (localVideoTrack) {
            localVideoTrack.restart({
                ...(DEFAULT_VIDEO_CONSTRAINTS),
                deviceId: { exact: newDeviceId }
            });
        }
    }, [localVideoTrack]);

    return (
        <div className="VideoInputList">
            {localVideoTrack &&
                <VideoTrack track={localVideoTrack} local />
            }

            {videoInputDevices.length > 1 ?
                <FormSelect
                    label="Камера"
                    name="camera"
                    value={localVideoInputDeviceId || ''}
                    options={videoInputDevices.map(device => ({
                        key: device.deviceId,
                        value: device.deviceId,
                        content: device.label,
                        label: device.label
                    }))}
                    onChange={handleDeviceChange}
                />
                :
                <Text>{localVideoTrack?.mediaStreamTrack.label || 'No Local Video'}</Text>
            }
        </div>
    );
}