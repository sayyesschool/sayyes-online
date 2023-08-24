import { useCallback, useState } from 'react';

import { FormSelect, Text } from 'shared/ui-components';

import { DEFAULT_VIDEO_CONSTRAINTS, SELECTED_VIDEO_INPUT_KEY } from 'app/constants';
import useRoomContext from 'app/hooks/useRoomContext';
import useMediaStreamTrack from 'app/hooks/useMediaStreamTrack';
import VideoTrack from 'app/components/VideoTrack';

export default function VideoInputList() {
    const { room } = useRoomContext();

    const videoTrack = room.video.track;
    const videoInputDevices = room.video.inputDevices;

    const mediaStreamTrack = useMediaStreamTrack(room.video.track);

    const [storedLocalVideoDeviceId, setStoredLocalVideoDeviceId] = useState(
        window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY)
    );

    const localVideoInputDeviceId = mediaStreamTrack?.getSettings().deviceId || storedLocalVideoDeviceId;

    const handleDeviceChange = useCallback((_, newDeviceId) => {
        // Here we store the device ID in the component state. This is so we can re-render this component display
        // to display the name of the selected device when it is changed while the users camera is off.
        setStoredLocalVideoDeviceId(newDeviceId);

        window.localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, newDeviceId);

        if (videoTrack) {
            videoTrack.restart({
                ...(DEFAULT_VIDEO_CONSTRAINTS),
                deviceId: { exact: newDeviceId }
            });
        }
    }, [videoTrack]);

    console.log('VideoInputList', videoTrack, videoInputDevices);

    return (
        <div className="VideoInputList">
            {videoTrack &&
                <VideoTrack track={videoTrack} local />
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
                <Text>{videoTrack?.mediaStreamTrack.label || 'No Local Video'}</Text>
            }
        </div>
    );
}