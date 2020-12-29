import React, { useState } from 'react';
import {
    Button,
    Dialog
} from 'mdc-react';

import useRoomContext from 'app/hooks/useRoomContext';
import { useHasAudioInputDevices, useHasVideoInputDevices } from 'app/hooks/deviceHooks';

export default function MediaErrorDialog({ error }) {
    const { isAcquiringLocalTracks } = useRoomContext();
    const hasAudio = useHasAudioInputDevices();
    const hasVideo = useHasVideoInputDevices();

    const [isDialogDismissed, setIsDialogDismissed] = useState(false);

    const isDialogOpen = !isDialogDismissed && !isAcquiringLocalTracks && (Boolean(error) || !hasAudio || !hasVideo);

    const { title, message } = getContent(hasAudio, hasVideo, error);

    return (
        <Dialog open={isDialogOpen}>
            <Dialog.Title>{title}</Dialog.Title>

            <Dialog.Content>{message}</Dialog.Content>

            <Dialog.Actions>
                <Button onClick={() => setIsDialogDismissed(true)}>
                    OK
                </Button>
            </Dialog.Actions>
        </Dialog>
    );
}

export function getContent(hasAudio, hasVideo, error) {
    let title = '';
    let message = '';

    switch (true) {
        // This error is emitted when the user or the user's system has denied permission to use the media devices
        case error?.name === 'NotAllowedError':
            title = 'Unable to Access Media:';

            if (error.message === 'Permission denied by system') {
                // Chrome only
                message =
                    'The operating system has blocked the browser from accessing the microphone or camera. Please check your operating system settings.';
            } else {
                message =
                    'The user has denied permission to use audio and video. Please grant permission to the browser to access the microphone and camera.';
            }

            break;

        // This error is emitted when input devices are not connected or disabled in the OS settings
        case error?.name === 'NotFoundError':
            title = 'Cannot Find Microphone or Camera:';
            message =
                'The browser cannot access the microphone or camera. Please make sure all input devices are connected and enabled.';
            break;

        // Other getUserMedia errors are less likely to happen in this app. Here we will display
        // the system's error message directly to the user.
        case Boolean(error):
            title = 'Error Acquiring Media:';
            message = `${error.name} ${error.message}`;
            break;

        case !hasAudio && !hasVideo:
            title = 'No Camera or Microphone Detected:';
            message = 'Other participants in the room will be unable to see and hear you.';
            break;

        case !hasVideo:
            title = 'No Camera Detected:';
            message = 'Other participants in the room will be unable to see you.';
            break;

        case !hasAudio:
            title = 'No Microphone Detected:';
            message = 'Other participants in the room will be unable to hear you.';
    }

    return {
        title,
        message,
    };
}