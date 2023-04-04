import { useEffect, useState } from 'react';
import { testPreflight } from 'twilio-video';

import { Heading, Icon, Link } from 'shared/ui-components';

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
        <div className="Lobby">
            {testPreflight &&
                <PreflightTest />
            }

            <Link
                href={`/${user.role}`}
                content="Вернуться в кабинет"
            />

            <Heading
                as="h1"
                type="h2"
                content="Вход в класс"
                mb={2}
            />

            <DeviceSelectionScreen
                name={user.fullname}
            />

            <MediaErrorDialog
                error={mediaError}
            />
        </div>
    );
}