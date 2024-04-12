import { useCallback, useEffect, useState } from 'react';

import { LMS_URL } from 'shared/constants';
import { useBoolean } from 'shared/hooks/state';
import { Button, Flex, Heading, IconButton, Link } from 'shared/ui-components';

import LocalVideoPreview from 'class/components/LocalVideoPreview';
import MediaAcquireDialog from 'class/components/MediaAcquireDialog';
import MediaDevicesDialog from 'class/components/MediaDevicesDialog';
import MediaErrorDialog from 'class/components/MediaErrorDialog';
import ToggleAudioButton from 'class/components/ToggleAudioButton';
import ToggleVideoButton from 'class/components/ToggleVideoButton';
import { useHasAudioInputDevices, useHasVideoInputDevices } from 'class/hooks/useDevices';
import useMediaDevicePermission from 'class/hooks/useMediaDevicePermission/useMediaDevicePermission';
import useRoomContext from 'class/hooks/useRoomContext';

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