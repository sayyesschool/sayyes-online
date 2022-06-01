import { useCallback, useRef, useState } from 'react';

import useRoomContext from 'app/hooks/useRoomContext';

export default function useLocalVideoToggle() {
    const {
        room: { localParticipant },
        localTracks,
        getLocalVideoTrack,
        removeLocalVideoTrack,
        onError,
    } = useRoomContext();

    const previousDeviceIdRef = useRef();

    const [isPublishing, setIsPublishing] = useState(false);

    const videoTrack = localTracks.find(track => track.name.includes('camera'));

    const toggleVideoEnabled = useCallback(() => {
        if (!isPublishing) {
            if (videoTrack) {
                const localTrackPublication = localParticipant?.unpublishTrack(videoTrack);
                // TODO: remove when SDK implements this event. See: https://issues.corp.twilio.com/browse/JSDK-2592
                localParticipant?.emit('trackUnpublished', localTrackPublication);
                previousDeviceIdRef.current = videoTrack.mediaStreamTrack.getSettings().deviceId;
                removeLocalVideoTrack();
            } else {
                setIsPublishing(true);

                getLocalVideoTrack({ deviceId: { exact: previousDeviceIdRef.current } })
                    .then(track => localParticipant?.publishTrack(track, { priority: 'low' }))
                    .catch(onError)
                    .finally(() => setIsPublishing(false));
            }
        }
    }, [videoTrack, localParticipant, getLocalVideoTrack, isPublishing, onError, removeLocalVideoTrack]);

    return [!!videoTrack, toggleVideoEnabled];
}
