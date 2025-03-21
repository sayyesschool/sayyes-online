import { useCallback, useEffect, useRef, useState } from 'react';

import EventEmitter from 'events';
import Video from 'twilio-video';

import { isMobile } from 'class/utils';

export default function useRoom(localTracks, options, onError) {
    const optionsRef = useRef(options);
    const [room, setRoom] = useState(new EventEmitter());
    const [isConnecting, setIsConnecting] = useState(false);

    // This allows the connect function to always access the most recent version of the options object. This allows us to
    // reliably use the connect function at any time.
    useEffect(() => {
        optionsRef.current = options;
    }, [options]);

    const connect = useCallback(token => {
        setIsConnecting(true);

        return Video.connect(token, { ...optionsRef.current, tracks: localTracks })
            .then(room => {
                function disconnect() {
                    room.disconnect();
                }

                // This app can add up to 16 'participantDisconnected' listeners to the room object, which can trigger
                // a warning from the EventEmitter object. Here we increase the max listeners to suppress the warning.
                room.setMaxListeners(16);

                // All video tracks are published with 'low' priority because the video track
                // that is displayed in the 'MainParticipant' component will have it's priority
                // set to 'high' via track.setPriority()
                room.localParticipant.videoTracks.forEach(publication => publication.setPriority('low'));

                room.once('disconnected', () => {
                    // Reset the room only after all other `disconnected` listeners have been called.
                    setTimeout(() => setRoom(new EventEmitter()));

                    window.removeEventListener('beforeunload', disconnect);

                    if (isMobile) {
                        window.removeEventListener('pagehide', disconnect);
                    }
                });

                // Add a listener to disconnect from the room when a user closes their browser
                window.addEventListener('beforeunload', disconnect);

                if (isMobile) {
                    // Add a listener to disconnect from the room when a mobile user closes their browser
                    window.addEventListener('pagehide', disconnect);
                }

                setRoom(room);
                setIsConnecting(false);
            })
            .catch(error => {
                setIsConnecting(false);
                onError(error);
            });
    }, [localTracks, onError]);

    const disconnect = useCallback(() => {
        room?.disconnect();
    }, [room]);

    return { room, connect, disconnect, isConnecting };
}