import EventEmitter from 'events';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
    DEFAULT_VIDEO_CONSTRAINTS,
    SELECTED_AUDIO_INPUT_KEY,
    SELECTED_VIDEO_INPUT_KEY
} from 'app/constants';
import Room from 'app/lib/room';
import { isMobile } from 'app/utils';

export default function useRoom(localTracks, options, onError) {
    const roomRef = useRef(new Room());
    const optionsRef = useRef(options);
    const [room, setRoom] = useState(new EventEmitter());
    const [isConnecting, setIsConnecting] = useState(false);

    // This allows the connect function to always access the most recent version of the options object. This allows us to
    // reliably use the connect function at any time.
    useEffect(() => {
        optionsRef.current = options;

        const room = roomRef.current;
        const selectedVideoDeviceId = window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY);
        const selectedAudioDeviceId = window.localStorage.getItem(SELECTED_AUDIO_INPUT_KEY);

        room.init({
            video: {
                ...DEFAULT_VIDEO_CONSTRAINTS,
                deviceId: selectedVideoDeviceId
            },
            audio: {
                deviceId: selectedAudioDeviceId
            }
        });

        console.log('Room ref', room);
    }, [options]);

    const connect = useCallback(token => {
        setIsConnecting(true);

        roomRef.current?.connect(token, optionsRef.current)
            .then(room => {
                function disconnect() {
                    room.disconnect();
                }

                // Add a listener to disconnect from the room when a user closes their browser
                window.addEventListener('beforeunload', disconnect);

                if (isMobile) {
                    // Add a listener to disconnect from the room when a mobile user closes their browser
                    window.addEventListener('pagehide', disconnect);
                }

                room.once('disconnected', () => {
                    window.removeEventListener('beforeunload', disconnect);

                    if (isMobile) {
                        window.removeEventListener('pagehide', disconnect);
                    }
                });

                setRoom(room.room);
            })
            .catch(error => {
                onError(error);
            })
            .finally(() => {
                setIsConnecting(false);
            });
    }, [onError]);

    const disconnect = useCallback(() => {
        room?.disconnect();
    }, [room]);

    return {
        room,
        connect,
        disconnect,
        isConnecting
    };
}