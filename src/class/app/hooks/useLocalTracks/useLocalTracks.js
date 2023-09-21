import { useCallback, useState } from 'react';
import { createLocalAudioTrack, createLocalVideoTrack, createLocalTracks } from 'twilio-video';

import {
    DEFAULT_VIDEO_CONSTRAINTS,
    SELECTED_AUDIO_INPUT_KEY,
    SELECTED_VIDEO_INPUT_KEY
} from 'app/constants';
import useAppState from 'app/hooks/useAppState';
import { useAudioInputDevices, useVideoInputDevices } from 'app/hooks/useDevices';
import { isPermissionDenied } from 'app/utils';

// const noiseCancellationOptions = {
//     sdkAssetsPath: '/noisecancellation',
//     vendor: 'krisp',
// };

export default function useLocalTracks() {
    // const { setIsKrispEnabled, setIsKrispInstalled } = useAppState();
    const [audioTrack, setAudioTrack] = useState();
    const [videoTrack, setVideoTrack] = useState();
    const [isAcquiringLocalTracks, setIsAcquiringLocalTracks] = useState(false);

    const localAudioDevices = useAudioInputDevices();
    const localVideoDevices = useVideoInputDevices();

    const getLocalAudioTrack = useCallback(deviceId => {
        const options = {};

        if (deviceId) {
            options.deviceId = { exact: deviceId };
        }

        return createLocalAudioTrack(options)
            .then(audioTrack => {
                setAudioTrack(audioTrack);
                return audioTrack;
            });
    }, []);

    const getLocalVideoTrack = useCallback(() => {
        const selectedVideoDeviceId = window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY);

        const hasSelectedVideoDevice = localVideoDevices.some(
            device => selectedVideoDeviceId && device.deviceId === selectedVideoDeviceId
        );

        const options = {
            ...DEFAULT_VIDEO_CONSTRAINTS,
            name: `camera-${Date.now()}`,
            ...(hasSelectedVideoDevice && { deviceId: { exact: selectedVideoDeviceId } })
        };

        return createLocalVideoTrack(options)
            .then(videoTrack => {
                setVideoTrack(videoTrack);
                return videoTrack;
            });
    }, [localVideoDevices]);

    const getAudioAndVideoTracks = useCallback(async () => {
        const hasAudioInputDevices = localAudioDevices.length > 0;
        const hasVideoInputDevices = localVideoDevices.length > 0;

        if (!hasAudioInputDevices && !hasVideoInputDevices)
            return Promise.resolve();
        if (isAcquiringLocalTracks || audioTrack || videoTrack)
            return Promise.resolve();

        setIsAcquiringLocalTracks(true);

        const selectedAudioDeviceId = window.localStorage.getItem(SELECTED_AUDIO_INPUT_KEY);
        const selectedVideoDeviceId = window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY);

        const hasSelectedAudioDevice = localAudioDevices.some(
            device => selectedAudioDeviceId && device.deviceId === selectedAudioDeviceId
        );
        const hasSelectedVideoDevice = localVideoDevices.some(
            device => selectedVideoDeviceId && device.deviceId === selectedVideoDeviceId
        );

        const isMicrophonePermissionDenied = await isPermissionDenied('microphone');
        const isCameraPermissionDenied = await isPermissionDenied('camera');

        console.log('isMicrophonePermissionDenied', isMicrophonePermissionDenied);
        console.log('isCameraPermissionDenied', isCameraPermissionDenied);

        // In Chrome, it is possible to deny permissions to only audio or only video.
        // If that has happened, then we don't want to attempt to acquire the device.
        if (isMicrophonePermissionDenied && isCameraPermissionDenied)
            throw new Error('NotAllowedError');

        if (isMicrophonePermissionDenied)
            throw new Error('MicrophonePermissionsDenied');

        if (isCameraPermissionDenied)
            throw new Error('CameraPermissionsDenied');

        const localTrackConstraints = {
            audio: {
                // noiseCancellationOptions,
                ...(hasSelectedAudioDevice && { deviceId: { exact: selectedAudioDeviceId } }),
            },
            video: {
                ...DEFAULT_VIDEO_CONSTRAINTS,
                name: `camera-${Date.now()}`,
                ...(hasSelectedVideoDevice && { deviceId: { exact: selectedVideoDeviceId } }),
            }
        };

        return createLocalTracks(localTrackConstraints)
            .then(tracks => {
                const audioTrack = tracks.find(track => track.kind === 'audio');
                const videoTrack = tracks.find(track => track.kind === 'video');

                if (audioTrack) {
                    setAudioTrack(audioTrack);

                    // if (audioTrack.noiseCancellation) {
                    //     setIsKrispEnabled(true);
                    //     setIsKrispInstalled(true);
                    // }
                }

                if (videoTrack) {
                    setVideoTrack(videoTrack);
                    // Save the deviceId so it can be picked up by the VideoInputList component. This only matters
                    // in cases where the user's video is disabled.
                    window.localStorage.setItem(
                        SELECTED_VIDEO_INPUT_KEY,
                        videoTrack.mediaStreamTrack.getSettings().deviceId ?? ''
                    );
                }

                console.log('TRACKS', tracks);
            })
            .finally(() => setIsAcquiringLocalTracks(false));
    }, [
        localAudioDevices,
        localVideoDevices,
        audioTrack,
        videoTrack,
        isAcquiringLocalTracks
    ]);

    const removeLocalAudioTrack = useCallback(() => {
        if (audioTrack) {
            audioTrack.stop();
            setAudioTrack(undefined);
        }
    }, [audioTrack]);

    const removeLocalVideoTrack = useCallback(() => {
        if (videoTrack) {
            videoTrack.stop();
            setVideoTrack(undefined);
        }
    }, [videoTrack]);

    const localTracks = [audioTrack, videoTrack].filter(track => track !== undefined);

    return {
        localTracks,
        isAcquiringLocalTracks,
        getLocalVideoTrack,
        getLocalAudioTrack,
        getAudioAndVideoTracks,
        removeLocalAudioTrack,
        removeLocalVideoTrack
    };
}