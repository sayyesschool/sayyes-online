import React, { useState, useEffect } from 'react';
import { testPreflight } from 'twilio-video';

import useRoomContext from 'app/hooks/useRoomContext';
import DeviceSelectionScreen from 'app/components/DeviceSelectionScreen';
import MediaErrorDialog from 'app/components/MediaErrorDialog';

import './index.scss';

export default function Lobby({ user }) {
    const { getAudioAndVideoTracks } = useRoomContext();

    const [mediaError, setMediaError] = useState();

    useEffect(() => {
        if (!mediaError) {
            getAudioAndVideoTracks().catch(error => {
                console.log('Error acquiring local media:');
                console.dir(error);
                setMediaError(error);
            });
        }
    }, [mediaError, getAudioAndVideoTracks]);

    return (
        <div className="lobby">
            {testPreflight &&
                <PreflightTest />
            }

            <DeviceSelectionScreen
                name={user.firstname}
            />

            <MediaErrorDialog
                error={mediaError}
            />
        </div>
    );
}