import { STORAGE_URL } from 'shared/constants';
import { Dialog, Image, Text } from 'shared/ui-components';

import { getContent } from './helpers';

export default function MediaErrorDialog({
    open,
    error,
    hasAudio,
    hasVideo,
    onClose
}) {
    const { title, message, image } = getContent(error, hasAudio, hasVideo);

    return (
        <Dialog
            className="MediaErrorDialog"
            open={open}
            title={title}
            onClose={onClose}
        >
            {image &&
                <Image src={`${STORAGE_URL}/assets/images/media-permissions/${image}`} />
            }

            <Text>{message}</Text>
        </Dialog>
    );
}