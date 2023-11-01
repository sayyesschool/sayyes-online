import { Dialog, Image, Text } from 'shared/ui-components';

export default function MediaAcquireDialog(props) {
    return (
        <Dialog
            className="MediaAcquireDialog"
            closable={false}
            {...props}
        >
            <Image src={`${STORAGE_URL}/assets/images/media-permissions/intro.svg`} />

            <Text type="title-lg">Нам необходимо получить доступ к вашему микрофону и камере.</Text>

            <Text type="title-md">Нажмите <strong>Разрешить</strong></Text>

            <Text>В любой момент встречи микрофон и камеру можно отключить.</Text>
        </Dialog>
    );
}