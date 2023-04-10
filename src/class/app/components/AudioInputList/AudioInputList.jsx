import { useCallback } from 'react';

import { FormSelect, Text } from 'shared/ui-components';

import { SELECTED_AUDIO_INPUT_KEY } from 'app/constants';
// import useAppState from 'app/hooks/useAppState';
import { useAudioInputDevices } from 'app/hooks/useDevices';
import useRoomContext from 'app/hooks/useRoomContext';
import useMediaStreamTrack from 'app/hooks/useMediaStreamTrack';
import AudioLevelIndicator from 'app/components/AudioLevelIndicator';

export default function AudioInputList() {
    // const { isKrispEnabled, isKrispInstalled } = useAppState();
    const { localTracks } = useRoomContext();
    const audioInputDevices = useAudioInputDevices();
    // const { toggleKrisp } = useKrispToggle();

    const localAudioTrack = localTracks.find(track => track.kind === 'audio');
    const srcMediaStreamTrack = localAudioTrack?.noiseCancellation?.sourceTrack;
    const mediaStreamTrack = useMediaStreamTrack(localAudioTrack);
    const localAudioInputDeviceId = srcMediaStreamTrack?.getSettings().deviceId || mediaStreamTrack?.getSettings().deviceId;

    const handleDeviceChange = useCallback((_, newDeviceId) => {
        window.localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, newDeviceId);

        if (localAudioTrack) {
            localAudioTrack.restart({ deviceId: { exact: newDeviceId } });
        }
    }, [localAudioTrack]);

    return (
        <div className="AudioInputList">
            {audioInputDevices.length > 1 ?
                <FormSelect
                    label="Микрофон"
                    value={localAudioInputDeviceId || ''}
                    options={audioInputDevices.map(device => ({
                        key: device.deviceId,
                        value: device.deviceId,
                        content: device.label,
                        label: device.label
                    }))}
                    endDecorator={
                        <AudioLevelIndicator
                            audioTrack={localAudioTrack}
                            color="black"
                        />
                    }
                    onChange={handleDeviceChange}
                />
                :
                <Text>{localAudioTrack?.mediaStreamTrack.label || 'No Local Audio'}</Text>
            }

            {/* {isKrispInstalled &&
                <div className="">
                    <div>
                        <Text variant="subtitle2">Noise Cancellation powered by </Text>
                        <KrispLogo />
                        <Text>Suppress background noise from your microphone</Text>
                    </div>

                    <Switch
                        label={isKrispEnabled ? 'Enabled' : 'Disabled'}
                        checked={isKrispEnabled}
                        onClick={toggleKrisp}
                        disabled={isAcquiringLocalTracks}
                    />
                </div>
            } */}
        </div>
    );
}