import { useCallback, useState } from 'react';
import {
    Button,
    Card,
    IconButton,
    LayoutGrid,
    Typography
} from 'mdc-react';

import useRoomContext from 'app/hooks/useRoomContext';
import LocalVideoPreview from 'app/components/LocalVideoPreview';
import DeviceSelectionDialog from 'app/components/DeviceSelectionDialog';
import ToggleAudioButton from 'app/components/ToggleAudioButton';
import ToggleVideoButton from 'app/components/ToggleVideoButton';

export default function DeviceSelectionScreen({ name }) {
    const { connect, isAcquiringLocalTracks, isConnecting } = useRoomContext();

    const [deviceSettingsOpen, setDeviceSettingsOpen] = useState(false);

    const handleConnect = useCallback(() => {
        connect(window.TWILIO_VIDEO_TOKEN);
    }, [connect]);

    const disableButtons = isAcquiringLocalTracks || isConnecting;

    return (
        <div className="device-selection-screen">
            <Card outlined>
                <LayoutGrid>
                    <LayoutGrid.Cell span="4">
                        <Card.Section secondary>
                            <img src="https://static.sayes.ru/images/cat/cat-laptop.png" alt="" />
                        </Card.Section>
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="8">
                        <Card.Section primary>
                            <Typography type="headline4">Вход в класс</Typography>

                            <LocalVideoPreview identity={name} />
                        </Card.Section>

                        <Card.Actions>
                            <Card.ActionIcons>
                                <ToggleAudioButton disabled={disableButtons} />

                                <ToggleVideoButton disabled={disableButtons} />

                                <IconButton
                                    icon="settings"
                                    disabled={disableButtons}
                                    onClick={() => setDeviceSettingsOpen(true)}
                                />
                            </Card.ActionIcons>

                            <Card.ActionButtons>
                                <Button
                                    className="connect-button"
                                    label="Присоединиться"
                                    unelevated
                                    disabled={disableButtons}
                                    onClick={handleConnect}
                                />
                            </Card.ActionButtons>
                        </Card.Actions>
                    </LayoutGrid.Cell>
                </LayoutGrid>
            </Card>

            <DeviceSelectionDialog
                open={deviceSettingsOpen}
                onClose={() => setDeviceSettingsOpen(false)}
            />
        </div>
    );
}
