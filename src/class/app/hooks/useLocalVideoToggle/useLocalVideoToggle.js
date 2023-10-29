import { useCallback, useState } from 'react';

import useRoomContext from 'app/hooks/useRoomContext';

export default function useLocalVideoToggle() {
    const {
        room: { localParticipant },
        videoTrack,
        getLocalVideoTrack,
        removeLocalVideoTrack,
        onError,
    } = useRoomContext();

    const [isPublishing, setIsPublishing] = useState(false);

    const toggleVideoEnabled = useCallback(() => {
        if (isPublishing) return;

        if (videoTrack) {
            const localTrackPublication = localParticipant?.unpublishTrack(videoTrack);
            // TODO: remove when SDK implements this event. See: https://issues.corp.twilio.com/browse/JSDK-2592
            localParticipant?.emit('trackUnpublished', localTrackPublication);
            removeLocalVideoTrack();
        } else {
            setIsPublishing(true);

            getLocalVideoTrack()
                .then(track => localParticipant?.publishTrack(track, { priority: 'low' }))
                .catch(onError)
                .finally(() => setIsPublishing(false));
        }
    }, [
        isPublishing,
        videoTrack,
        localParticipant,
        getLocalVideoTrack,
        removeLocalVideoTrack,
        onError
    ]);

    return [!!videoTrack, toggleVideoEnabled];
}