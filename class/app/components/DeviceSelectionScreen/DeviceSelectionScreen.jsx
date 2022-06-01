import { useCallback } from 'react';
import { Button, Flex, Header } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import Icon from 'shared/components/icon';

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
            <Header content="Вход в класс" />

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
