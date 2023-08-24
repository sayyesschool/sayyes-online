import { Dialog, Text } from 'shared/ui-components';

import { getContent } from './helpers';

export default function MediaErrorDialog({ error, hasAudio, hasVideo, open, onClose }) {
    const { title, message } = getContent(hasAudio, hasVideo, error);

    return (
        <Dialog
            open={open}
            header={title}
            content={<Text>{message}</Text>}
            confirmButton={{
                content: 'OK',
                onClick: onClose
            }}
        />
    );
}