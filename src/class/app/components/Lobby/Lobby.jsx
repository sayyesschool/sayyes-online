import { useCallback, useEffect, useState } from 'react';
import { testPreflight } from 'twilio-video';

import { useBoolean } from 'shared/hooks/state';
import { Button, IconButton, Flex, Heading, Link } from 'shared/ui-components';

import useRoomContext from 'app/hooks/useRoomContext';
import { useHasAudioInputDevices, useHasVideoInputDevices } from 'app/hooks/useDevices';
import useMediaDevicePermission from 'app/hooks/useMediaDevicePermission/useMediaDevicePermission';
import LocalVideoPreview from 'app/components/LocalVideoPreview';
import MediaAcquireDialog from 'app/components/MediaAcquireDialog';
import MediaErrorDialog from 'app/components/MediaErrorDialog';
import MediaDevicesDialog from 'app/components/MediaDevicesDialog';
import ToggleAudioButton from 'app/components/ToggleAudioButton';
import ToggleVideoButton from 'app/components/ToggleVideoButton';

export default function Lobby({ user }) {
    const {
        connect,
        isConnecting,
        isAcquiringLocalTracks,
        getAudioAndVideoTracks
    } = useRoomContext();
    const hasAudioInputDevices = useHasAudioInputDevices();
    const hasVideoInputDevices = useHasVideoInputDevices();
    const cameraPermission = useMediaDevicePermission('camera');
    const microphonePermission = useMediaDevicePermission('microphone');

    const [isMediaDevicesDialogOpen, toggleMediaDevicesDialogOpen] = useBoolean(false);
    const [isMediaAcquireDialogOpen, setMediaAcquireDialogOpen] = useState(false);
    const [mediaError, setMediaError] = useState();

    useEffect(() => {
        if (
            cameraPermission?.state === 'prompt' &&
            microphonePermission?.state === 'prompt'
        ) setMediaAcquireDialogOpen(true);
    }, [cameraPermission, microphonePermission]);

    useEffect(() => {
        if (
            mediaError ||
            !hasAudioInputDevices ||
            !hasVideoInputDevices ||
            isAcquiringLocalTracks
        ) return;

        getAudioAndVideoTracks()
            .catch(error => {
                setMediaError(error);
            })
            .finally(() => {
                setMediaAcquireDialogOpen(false);
            });
    }, [
        mediaError,
        hasAudioInputDevices,
        hasVideoInputDevices,
        isAcquiringLocalTracks,
        getAudioAndVideoTracks
    ]);

    const handleConnect = useCallback(() => {
        connect(window.TWILIO_VIDEO_TOKEN);
    }, [connect]);

    const handleMediaErrorDialogClose = useCallback(() => {
        setMediaError();
    }, []);

    const disableButtons = isAcquiringLocalTracks || isConnecting;

    return (
        <div className="Lobby">
            {/* {testPreflight &&
                <PreflightTest />
            } */}

            <Link
                href={LMS_URL}
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
                        onClick={toggleMediaDevicesDialogOpen}
                    />
                </IconButton.Group>

                <Button
                    content="Присоединиться"
                    loading={isConnecting}
                    disabled={disableButtons}
                    onClick={handleConnect}
                />
            </Flex>

            <MediaAcquireDialog
                open={isMediaAcquireDialogOpen}
            />

            <MediaErrorDialog
                open={!!mediaError}
                error={mediaError}
                hasAudio={hasAudioInputDevices}
                hasVideo={hasVideoInputDevices}
                onClose={handleMediaErrorDialogClose}
            />

            <MediaDevicesDialog
                open={isMediaDevicesDialogOpen}
                onClose={toggleMediaDevicesDialogOpen}
            />
        </div>
    );
}