import { Dialog, Image, Text } from 'shared/ui-components';

export default function MediaAcquireDialog(props) {
    return (
        <Dialog
            className="MediaAcquireDialog"
            closable={false}
            {...props}
        >
            <Image src="/images/media-permissions.svg" />

            <Text type="title-lg">Нажмите <strong>Разрешить</strong></Text>

            <Text>В любой момент встречи микрофон и камеру можно отключить.</Text>
        </Dialog>
    );
}