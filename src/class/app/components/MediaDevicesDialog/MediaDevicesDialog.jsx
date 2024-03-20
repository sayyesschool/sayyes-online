import { Dialog, Flex } from 'shared/ui-components';

import AudioInputList from 'app/components/AudioInputList';
import AudioOutputList from 'app/components/AudioOutputList';
import VideoInputList from 'app/components/VideoInputList';

export default function DeviceSelectionDialog({ open, onClose }) {
    return (
        <Dialog className="DeviceSelectionDialog"
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