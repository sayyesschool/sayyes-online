import { Dialog, Image, Flex, Text } from 'shared/ui-components';

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
                <Image src={`/images/${image}`} />
            }

            <Text>{message}</Text>
        </Dialog>
    );
}