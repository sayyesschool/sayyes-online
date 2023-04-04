import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Button, IconButton, Flex } from 'shared/ui-components';

import useRoomContext from 'app/hooks/useRoomContext';
import LocalVideoPreview from 'app/components/LocalVideoPreview';
import DeviceSelectionDialog from 'app/components/DeviceSelectionDialog';
import ToggleAudioButton from 'app/components/ToggleAudioButton';
import ToggleVideoButton from 'app/components/ToggleVideoButton';

export default function DeviceSelectionScreen({ name }) {
    const { connect, isAcquiringLocalTracks, isConnecting } = useRoomContext();

    const [deviceSettingsOpen, toggleDeviceSettingsOpen] = useBoolean(false);

    const handleConnect = useCallback(() => {
        connect(window.TWILIO_VIDEO_TOKEN);
    }, [connect]);

    const disableButtons = isAcquiringLocalTracks || isConnecting;

    return (
        <div className="DeviceSelectionScreen">
            <LocalVideoPreview identity={name} />

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
        </div>
    );
}