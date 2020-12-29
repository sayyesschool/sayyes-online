import React, { useCallback } from 'react';
import {
    Layout,
    Select,
    Typography
} from 'mdc-react';

import { SELECTED_AUDIO_INPUT_KEY } from 'app/constants';
import { useAudioInputDevices } from 'app/hooks/deviceHooks';
import useRoomContext from 'app/hooks/useRoomContext';
import useMediaStreamTrack from 'app/hooks/useMediaStreamTrack';
import AudioLevelIndicator from 'app/components/AudioLevelIndicator';

export default function AudioInputList() {
    const { localTracks } = useRoomContext();
    const audioInputDevices = useAudioInputDevices();

    const localAudioTrack = localTracks.find(track => track.kind === 'audio');
    const mediaStreamTrack = useMediaStreamTrack(localAudioTrack);
    const localAudioInputDeviceId = mediaStreamTrack?.getSettings().deviceId;

    const replaceTrack = useCallback(newDeviceId => {
        window.localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, newDeviceId);
        localAudioTrack?.restart({ deviceId: { exact: newDeviceId } });
    }, []);

    return (
        <div className="audio-input-list">
            <Typography type="subtitle2">Микрофон</Typography>

            <Layout column alignItems="center" justify="space-between">
                {audioInputDevices.length > 1 ?
                    <Select
                        filled
                        value={localAudioInputDeviceId || ''}
                        leadingIcon={
                            <span>
                                <AudioLevelIndicator audioTrack={localAudioTrack} color="black" />
                            </span>
                        }
                        onChange={e => replaceTrack(e.target.value)}
                        options={audioInputDevices.map(device => ({
                            key: device.deviceId,
                            value: device.deviceId,
                            text: device.label
                        }))}
                    />
                    :
                    <Typography>{localAudioTrack?.mediaStreamTrack.label || 'No Local Audio'}</Typography>
                }
            </Layout>
        </div>
    );
}