import { useCallback } from 'react';
import { Flex, Text } from '@fluentui/react-northstar';

import FormSelect from 'shared/components/form-select';

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
            {audioInputDevices.length > 1 ?
                <FormSelect
                    label={
                        <Flex vAlign="center">
                            Микрофон

                            <AudioLevelIndicator audioTrack={localAudioTrack} />
                        </Flex>
                    }
                    value={localAudioInputDeviceId || ''}
                    options={audioInputDevices.map(device => ({
                        key: device.deviceId,
                        value: device.deviceId,
                        header: device.label
                    }))}
                    onChange={e => replaceTrack(e.target.value)}
                />
                :
                <Text>{localAudioTrack?.mediaStreamTrack.label || 'No Local Audio'}</Text>
            }
        </div>
    );
}