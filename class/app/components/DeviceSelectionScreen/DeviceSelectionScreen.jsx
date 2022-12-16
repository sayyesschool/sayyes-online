import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Button, Flex, Icon } from 'shared/ui-components';

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
        <div className="device-selection-screen">
            <LocalVideoPreview identity={name} />

            <Flex space="between">
                <Flex>
                    <ToggleAudioButton disabled={disableButtons} />

                    <ToggleVideoButton disabled={disableButtons} />

                    <Button
                        icon={<Icon>settings</Icon>}
                        iconOnly
                        text
                        title="Настройки"
                        disabled={disableButtons}
                        onClick={toggleDeviceSettingsOpen}
                    />
                </Flex>

                <Button
                    className="connect-button"
                    content="Присоединиться"
                    primary
                    disabled={disableButtons}
                    loading={isConnecting}
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
