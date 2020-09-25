import React from 'react';
import {
    Button,
    Dialog,
} from 'mdc-react';

import { useLocalVideo } from 'shared/hooks/twilio';

export default function VideoPreviewDialog({ onClose, ...props }) {
    const videoRef = useLocalVideo();

    return (
        <Dialog
            className="video-preview-dialog"
            title="Подключение к уроку"
            persistent {...props}
        >
            <Dialog.Content>
                <video ref={videoRef} className="media media--preview" />
            </Dialog.Content>

            <Dialog.Actions>
                <Button onClick={onClose}>ОК</Button>
            </Dialog.Actions>
        </Dialog>
    );
}