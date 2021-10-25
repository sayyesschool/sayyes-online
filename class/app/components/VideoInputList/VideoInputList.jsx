import { Select, Typography } from 'mdc-react';

import { DEFAULT_VIDEO_CONSTRAINTS, SELECTED_VIDEO_INPUT_KEY } from 'app/constants';

import useRoomContext from 'app/hooks/useRoomContext';
import useMediaStreamTrack from 'app/hooks/useMediaStreamTrack';
import { useVideoInputDevices } from 'app/hooks/deviceHooks';
import VideoTrack from 'app/components/VideoTrack';

export default function VideoInputList() {
    const { localTracks } = useRoomContext();
    const videoInputDevices = useVideoInputDevices();

    const localVideoTrack = localTracks.find(track => track.kind === 'video');
    const mediaStreamTrack = useMediaStreamTrack(localVideoTrack);
    const localVideoInputDeviceId = mediaStreamTrack?.getSettings().deviceId;

    function replaceTrack(newDeviceId) {
        window.localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, newDeviceId);
        localVideoTrack.restart({
            ...(DEFAULT_VIDEO_CONSTRAINTS),
            deviceId: { exact: newDeviceId },
        });
    }

    return (
        <div className="video-input-list">
            {localVideoTrack && (
                <div className="video-preview">
                    <VideoTrack isLocal track={localVideoTrack} />
                </div>
            )}

            <Typography type="subtitle2">Камера</Typography>

            {videoInputDevices.length > 1 ?
                <Select
                    filled
                    value={localVideoInputDeviceId || ''}
                    onChange={e => replaceTrack(e.target.value)}
                    options={videoInputDevices.map(device => ({
                        key: device.deviceId,
                        value: device.deviceId,
                        text: device.label
                    }))}
                />
                :
                <Typography>{localVideoTrack?.mediaStreamTrack.label || 'No Local Video'}</Typography>
            }
        </div>
    );
}