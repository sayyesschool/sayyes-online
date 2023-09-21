import { createContext } from 'react';

import useConnectionOptions from 'app/hooks/useConnectionOptions';
import useLocalTracks from 'app/hooks/useLocalTracks';
import useRoom from 'app/hooks/useRoom';
import useDominantSpeaker from 'app/hooks/useDominantSpeaker';
import useParticipants from 'app/hooks/useParticipants';
import useSelectedParticipant from 'app/hooks/useSelectedParticipant';
import useScreenShareToggle from 'app/hooks/useScreenShareToggle';
import useScreenShareParticipant from 'app/hooks/useScreenShareParticipant';
import useHandleRoomDisconnection from 'app/hooks/useHandleRoomDisconnection';
import useHandleTrackPublicationFailed from 'app/hooks/useHandleTrackPublicationFailed';

export const RoomContext = createContext(null);

export function RoomProvider({
    onError = Function.prototype,
    onDisconnect = Function.prototype,
    children
}) {
    const {
        localTracks,
        isAcquiringLocalTracks,
        getLocalVideoTrack,
        getLocalAudioTrack,
        getAudioAndVideoTracks,
        removeLocalVideoTrack
    } = useLocalTracks();

    const connectionOptions = useConnectionOptions();

    const { room, connect, isConnecting } = useRoom(localTracks, connectionOptions, onError);
    const dominantSpeaker = useDominantSpeaker(room);
    const participants = useParticipants(room, dominantSpeaker);
    const screenShareParticipant = useScreenShareParticipant(room);
    const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant(room);
    const [isSharingScreen, toggleScreenShare] = useScreenShareToggle(room, onError);
    useHandleRoomDisconnection(room, onDisconnect, onError);
    useHandleTrackPublicationFailed(room, onError);

    const localParticipant = room.localParticipant;
    const remoteScreenShareParticipant = screenShareParticipant !== localParticipant ? screenShareParticipant : null;
    // Changing the order of the following variables will change the how the main speaker is determined.
    const mainParticipant = selectedParticipant || remoteScreenShareParticipant || dominantSpeaker || participants[0] || localParticipant;
    const audioTrack = localTracks.find(track => track.kind === 'audio');
    const videoTrack = localTracks.find(track => track.name.includes('camera'));

    return (
        <RoomContext.Provider
            value={{
                room,
                connect,
                isConnecting,
                localTracks,
                audioTrack,
                videoTrack,
                getLocalVideoTrack,
                getLocalAudioTrack,
                getAudioAndVideoTracks,
                isAcquiringLocalTracks,
                removeLocalVideoTrack,
                localParticipant,
                mainParticipant,
                dominantSpeaker,
                participants,
                screenShareParticipant,
                remoteScreenShareParticipant,
                selectedParticipant,
                setSelectedParticipant,
                isSharingScreen,
                toggleScreenShare,
                onError,
                onDisconnect
            }}
        >
            {children}
        </RoomContext.Provider>
    );
}