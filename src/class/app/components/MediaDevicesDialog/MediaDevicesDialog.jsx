import { Dialog, Flex } from 'shared/ui-components';

import AudioInputList from 'class/components/AudioInputList';
import AudioOutputList from 'class/components/AudioOutputList';
import VideoInputList from 'class/components/VideoInputList';

export default function DeviceSelectionDialog({ open, onClose }) {
    return (
        <Dialog
            className="DeviceSelectionDialog"
            open={open}
            title="Настройки аудио и видео"
            content={
                <Flex gap="smaller" column>
                    <VideoInputList />
                    <AudioInputList />
                    <AudioOutputList />
                </Flex>
            }
            actions={[{
                key: 'accept',
                content: 'Принять',
                onClick: onClose
            }]}
            onClose={onClose}
        />
    );
}