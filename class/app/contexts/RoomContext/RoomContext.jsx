import { createContext } from 'react';

import useRoom from 'app/hooks/useRoom';
import useLocalTracks from 'app/hooks/useLocalTracks';
import useScreenShareToggle from 'app/hooks/useScreenShareToggle';
import useHandleRoomDisconnectionErrors from 'app/hooks/useHandleRoomDisconnectionErrors';
import useHandleTrackPublicationFailed from 'app/hooks/useHandleTrackPublicationFailed';
import useHandleOnDisconnect from 'app/hooks/useHandleOnDisconnect';

export const RoomContext = createContext(null);

export function RoomProvider({
    options,
    onError = Function.prototype,
    onDisconnect = Function.prototype,
    children
}) {
    function onErrorCallback(error) {
        console.log(`ERROR: ${error.message}`, error);
        onError(error);
    }

    const {
        localTracks,
        getLocalVideoTrack,
        getLocalAudioTrack,
        getAudioAndVideoTracks,
        isAcquiringLocalTracks,
        removeLocalVideoTrack
    } = useLocalTracks();

    const { room, isConnecting, connect } = useRoom(localTracks, onErrorCallback, options);
    const [isSharingScreen, toggleScreenShare] = useScreenShareToggle(room, onError);

    useHandleRoomDisconnectionErrors(room, onError);
    useHandleTrackPublicationFailed(room, onError);
    useHandleOnDisconnect(room, onDisconnect);

    return (
        <RoomContext.Provider
            value={{
                room,
                localTracks,
                isConnecting,
                onError: onErrorCallback,
                onDisconnect,
                getLocalVideoTrack,
                getLocalAudioTrack,
                getAudioAndVideoTracks,
                connect,
                isAcquiringLocalTracks,
                removeLocalVideoTrack,
                isSharingScreen,
                toggleScreenShare,
            }}
        >
            {children}
        </RoomContext.Provider>
    );
}