import { createContext } from 'react';

import useConnectionOptions from 'app/hooks/useConnectionOptions';
import useLocalTracks from 'app/hooks/useLocalTracks';
import useRoom from 'app/hooks/useRoom';
import useScreenShareToggle from 'app/hooks/useScreenShareToggle';
import useHandleRoomDisconnectionErrors from 'app/hooks/useHandleRoomDisconnectionErrors';
import useHandleTrackPublicationFailed from 'app/hooks/useHandleTrackPublicationFailed';
import useHandleOnDisconnect from 'app/hooks/useHandleOnDisconnect';

export const RoomContext = createContext(null);

export function RoomProvider({
    onError = Function.prototype,
    onDisconnect = Function.prototype,
    children
}) {
    function onErrorCallback(error) {
        console.log(`ERROR: ${error.message}`, error);
        onError(error);
    }

    const connectionOptions = useConnectionOptions();

    const {
        localTracks,
        getLocalVideoTrack,
        getLocalAudioTrack,
        getAudioAndVideoTracks,
        isAcquiringLocalTracks,
        removeLocalVideoTrack
    } = useLocalTracks();

    const { room, isConnecting, connect } = useRoom(localTracks, onErrorCallback, connectionOptions);
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
                connect,
                onError: onErrorCallback,
                onDisconnect,
                getLocalVideoTrack,
                getLocalAudioTrack,
                getAudioAndVideoTracks,
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