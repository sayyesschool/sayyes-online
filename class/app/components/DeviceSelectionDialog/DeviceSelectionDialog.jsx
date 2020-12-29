import React from 'react';
import {
    Button,
    Dialog,
    Typography
} from 'mdc-react';

import AudioInputList from 'app/components/AudioInputList';
import AudioOutputList from 'app/components/AudioOutputList';
import VideoInputList from 'app/components/VideoInputList';

export default function DeviceSelectionDialog({ open, onClose }) {
    return (
        <Dialog className="device-selection-dialog" open={open} onClose={onClose}>
            <Dialog.Title>Настройки аудио и видео</Dialog.Title>

            <Dialog.Content>
                <section className="device-selection-dialog__section">
                    <Typography type="headline6">Видео</Typography>

                    <VideoInputList />
                </section>

                <section className="device-selection-dialog__section">
                    <Typography type="headline6">Аудио</Typography>

                    <AudioInputList />

                    <AudioOutputList />
                </section>
            </Dialog.Content>

            <Dialog.Actions>
                <Button onClick={onClose}>Принять</Button>
            </Dialog.Actions>
        </Dialog>
    );
}