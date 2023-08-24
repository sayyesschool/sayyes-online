import { useCallback, useState } from 'react';
import { testPreflight } from 'twilio-video';

import { useBoolean } from 'shared/hooks/state';
import { Button, IconButton, Flex, Heading, Link } from 'shared/ui-components';

import useRoomContext from 'app/hooks/useRoomContext';
import DeviceSelectionDialog from 'app/components/DeviceSelectionDialog';
import LocalVideoPreview from 'app/components/LocalVideoPreview';
import MediaErrorDialog from 'app/components/MediaErrorDialog';
import ToggleAudioButton from 'app/components/ToggleAudioButton';
import ToggleVideoButton from 'app/components/ToggleVideoButton';

import './index.scss';

export default function Lobby({ user }) {
    const { room, connect, isInitialized, isConnecting } = useRoomContext();

    const [deviceSettingsOpen, toggleDeviceSettingsOpen] = useBoolean(false);
    const [isDialogDismissed, setIsDialogDismissed] = useState(false);
    const [mediaError, setMediaError] = useState();

    const handleConnect = useCallback(() => {
        connect(window.TWILIO_VIDEO_TOKEN);
    }, [connect]);

    const hasAudio = room.audio.hasInputDevices;
    const hasVideo = room.video.hasInputDevices;
    const disableButtons = !isInitialized || isConnecting;
    const isErrorDialogOpen = !isDialogDismissed && !isInitialized && (Boolean(mediaError) || !hasAudio || !hasVideo);

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

            <LocalVideoPreview identity={user.fullname} />

            <Flex alignItems="center" justifyContent="space-between">
                <IconButton.Group>
                    <ToggleAudioButton disabled={disableButtons} />

                    <ToggleVideoButton disabled={disableButtons} />

                    <IconButton
                        icon="settings"
                        title="Настройки"
                        size="small"
                        disabled={disableButtons}
                        onClick={toggleDeviceSettingsOpen}
                    />
                </IconButton.Group>

                <Button
                    content="Присоединиться"
                    loading={isConnecting}
                    disabled={disableButtons}
                    onClick={handleConnect}
                />
            </Flex>

            <DeviceSelectionDialog
                open={deviceSettingsOpen}
                onClose={() => toggleDeviceSettingsOpen(false)}
            />

            <MediaErrorDialog
                error={mediaError}
                hasAudio={hasAudio}
                hasVideo={hasVideo}
                open={isErrorDialogOpen}
                onClose={() => setIsDialogDismissed(true)}
            />
        </div>
    );
}