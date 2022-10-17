import { Dialog, Icon } from 'shared/ui-components';

import AudioInputList from 'app/components/AudioInputList';
import AudioOutputList from 'app/components/AudioOutputList';
import VideoInputList from 'app/components/VideoInputList';

export default function DeviceSelectionDialog({ open, onClose }) {
    return (
        <Dialog className="device-selection-dialog"
            open={open}
            header="Настройки аудио и видео"
            headerAction={{
                icon: <Icon>close</Icon>,
                onClick: onClose
            }}
            content={<>
                <VideoInputList />

                <AudioInputList />

                <AudioOutputList />
            </>}
            confirmButton={{
                content: 'Принять',
                onClick: onClose
            }}
            onClose={onClose}
        />
    );
}