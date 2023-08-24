import { useCallback } from 'react';

import { FormSelect, Text } from 'shared/ui-components';

import { SELECTED_AUDIO_INPUT_KEY } from 'app/constants';
// import useAppState from 'app/hooks/useAppState';
import useRoomContext from 'app/hooks/useRoomContext';
import useMediaStreamTrack from 'app/hooks/useMediaStreamTrack';
import AudioLevelIndicator from 'app/components/AudioLevelIndicator';

export default function AudioInputList() {
    // const { isKrispEnabled, isKrispInstalled } = useAppState();
    const { room } = useRoomContext();
    // const { toggleKrisp } = useKrispToggle();

    const audioTrack = room.audio.track;
    const srcMediaStreamTrack = audioTrack?.noiseCancellation?.sourceTrack;
    const audioInputDevices = room.audio.inputDevices;

    const mediaStreamTrack = useMediaStreamTrack(audioTrack);

    const localAudioInputDeviceId = srcMediaStreamTrack?.getSettings().deviceId || mediaStreamTrack?.getSettings().deviceId;

    const handleDeviceChange = useCallback((_, newDeviceId) => {
        window.localStorage.setItem(SELECTED_AUDIO_INPUT_KEY, newDeviceId);

        if (audioTrack) {
            audioTrack.restart({ deviceId: { exact: newDeviceId } });
        }
    }, [audioTrack]);

    console.log('AudioInputList', audioTrack, audioInputDevices);

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
                            audioTrack={audioTrack}
                            color="black"
                        />
                    }
                    onChange={handleDeviceChange}
                />
                :
                <Text>{audioTrack?.mediaStreamTrack.label || 'No Local Audio'}</Text>
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