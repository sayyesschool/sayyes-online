import { useEffect, useRef } from 'react';

import useLocalVideoToggle from 'class/hooks/useLocalVideoToggle';
import useRoomContext from 'class/hooks/useRoomContext';
import { isMobile } from 'class/utils';

/*
  This component adds a visibilitychange handler to the document when
  the user is using a mobile device. When the handler detects that
  the browser has been backgrounded, it unpublishes the users local
  video track. The browser cannot send video to the room when it has
  been backgrounded, so unpublishing the track stops video capture
  on the device, and triggers a UI update for all other participants
  to show that this user's video track has been turned off.
*/

export default function useVisibilityHandler() {
    const { room } = useRoomContext();
    const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();

    const shouldRepublishVideoOnForeground = useRef(false);

    useEffect(() => {
        if (!room || !isMobile) return;

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

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [room, isVideoEnabled, toggleVideoEnabled]);
}