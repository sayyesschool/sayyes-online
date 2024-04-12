import { useEffect } from 'react';

export default function useHandleRoomDisconnection(room, onDisconnected, onError) {
    useEffect(() => {
        function handleDisconnected(room, error) {
            if (error) {
                onError(error);
            }

            // removeLocalAudioTrack();
            // removeLocalVideoTrack();
            // if (isSharingScreen) {
            //     toggleScreenShare();
            // }
        }

        room.on('disconnected', handleDisconnected);

        return () => {
            room.off('disconnected', handleDisconnected);
        };
    }, [room, onDisconnected, onError]);
}