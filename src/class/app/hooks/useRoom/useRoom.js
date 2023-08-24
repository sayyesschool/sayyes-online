import { useCallback, useEffect, useRef, useState } from 'react';

import {
    DEFAULT_VIDEO_CONSTRAINTS,
    SELECTED_AUDIO_INPUT_KEY,
    SELECTED_VIDEO_INPUT_KEY
} from 'app/constants';
import Room from 'app/lib/room';
import { isMobile } from 'app/utils';

export default function useRoom(options, onError) {
    const roomRef = useRef();
    const optionsRef = useRef(options);
    const shouldRepublishVideoOnForeground = useRef(false);

    const [isInitialized, setInitialized] = useState(false);
    const [isConnecting, setConnecting] = useState(false);
    const [isConnected, setConnected] = useState(false);
    const [isAudioEnabled, setAudioEnabled] = useState(false);
    const [isVideoEnabled, setVideoEnabled] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [dominantSpeaker, setDominantSpeaker] = useState([]);
    const [selectedParticipant, setSelectedParticipant] = useState([]);
    const [isScreenSharing, setScreenSharing] = useState(false);
    const [error, setError] = useState(null);

    // This allows the connect function to always access the most recent version of the options object. This allows us to
    // reliably use the connect function at any time.
    useEffect(() => {
        optionsRef.current = options;

        if (roomRef.current) return;

        const room = new Room();

        roomRef.current = room;

        const selectedVideoDeviceId = window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY);
        const selectedAudioDeviceId = window.localStorage.getItem(SELECTED_AUDIO_INPUT_KEY);

        function handleInitialized(room) {
            console.log('Initialized', room);
            setInitialized(true);
            setAudioEnabled(room.isAudioEnabled);
            setVideoEnabled(room.isVideoEnabled);
        }

        function handleConnected(room) {
            console.log('Connected', room);
            setConnected(true);
        }

        function handleDisconnected() {
            setConnected(false);
        }

        function handleAudioEnabled() {
            setAudioEnabled(room.isAudioEnabled);
        }

        function handleAudioDisabled() {
            setAudioEnabled(room.isAudioEnabled);
        }

        function handleVideoEnabled() {
            setVideoEnabled(room.isVideoEnabled);
        }

        function handleVideoDisabled() {
            setVideoEnabled(room.isVideoEnabled);
        }

        function handleScreenShareStarted() {
            setScreenSharing(true);
        }

        function handleScreenShareStopped() {
            setScreenSharing(false);
        }

        function handleParticipantConnected() {
            setParticipants(room.participants);
        }

        function handleParticipantDisconnected() {
            setParticipants(room.participants);
        }

        function handleDominantSpeakerChanged(dominantSpeaker) {
            setDominantSpeaker(dominantSpeaker);
        }

        function handleError(error) {
            setError(error);
        }

        function handleSelectedParticipant(participant) {
            setSelectedParticipant(participant);
        }

        room.on('initialized', handleInitialized);
        room.on('connected', handleConnected);
        room.on('disconnected', handleDisconnected);

        room.on('audioEnabled', handleAudioEnabled);
        room.on('audioDisabled', handleAudioDisabled);

        room.on('videoEnabled', handleVideoEnabled);
        room.on('videoDisabled', handleVideoDisabled);

        room.on('screenShareStarted', handleScreenShareStarted);
        room.on('screenShareStopped', handleScreenShareStopped);

        room.on('participantConnected', handleParticipantConnected);
        room.on('participantDisconnected', handleParticipantDisconnected);

        room.on('dominantSpeakerChanged', handleDominantSpeakerChanged);

        room.on('selectedParticipantChanged', handleSelectedParticipant);

        room.on('error', handleError);

        room.init({
            video: {
                ...DEFAULT_VIDEO_CONSTRAINTS,
                deviceId: selectedVideoDeviceId
            },
            audio: {
                deviceId: selectedAudioDeviceId
            }
        });

        return () => {
            room.off('connected', handleConnected);
            room.off('disconnected', handleDisconnected);

            room.off('audioEnabled', handleAudioEnabled);
            room.off('audioDisabled', handleAudioDisabled);

            room.off('videoStarted', handleVideo);
            room.off('videoStopped', handleVideo);

            room.off('screenShareStarted', handleScreenShareStarted);
            room.off('screenShareStopped', handleScreenShareStopped);

            room.off('participantConnected', handleParticipantConnected);
            room.off('participantDisconnected', handleParticipantDisconnected);

            room.off('dominantSpeakerChanged', handleDominantSpeakerChanged);

            room.off('selectedParticipantChanged', handleSelectedParticipant);

            room.off('error', handleError);
        };
    }, [options]);

    const connect = useCallback(token => {
        setConnecting(true);

        roomRef.current?.connect(token, optionsRef.current)
            .then(room => {
                function disconnect() {
                    room.disconnect();
                }

                function handleVisibilityChange() {
                    // We don't need to unpublish the local video track if it has already been unpublished
                    if (document.visibilityState === 'hidden' && isVideoEnabled) {
                        shouldRepublishVideoOnForeground.current = true;
                        toggleVideoEnabled();

                        // Don't publish the local video track if it wasn't published before the app was backgrounded
                    } else if (shouldRepublishVideoOnForeground.current) {
                        shouldRepublishVideoOnForeground.current = false;
                        toggleVideoEnabled();
                    }
                }

                // Add a listener to disconnect from the room when a user closes their browser
                window.addEventListener('beforeunload', disconnect);

                // Add a listener to disconnect from the room when a mobile user closes their browser
                if (isMobile)
                    window.addEventListener('pagehide', disconnect);

                document.addEventListener('visibilitychange', handleVisibilityChange);

                room.once('disconnected', () => {
                    window.removeEventListener('beforeunload', disconnect);

                    if (isMobile)
                        window.removeEventListener('pagehide', disconnect);

                    document.removeEventListener('visibilitychange', handleVisibilityChange);
                });
            })
            .catch(error => {
                onError(error);
            })
            .finally(() => {
                setConnecting(false);
            });
    }, [onError]);

    const disconnect = useCallback(() => {
        roomRef.current?.disconnect();
    }, []);

    return {
        room: roomRef.current,
        connect,
        disconnect,
        isInitialized,
        isConnecting,
        isConnected,
        isAudioEnabled,
        isVideoEnabled,
        participants,
        dominantSpeaker,
        selectedParticipant,
        isScreenSharing
    };
}