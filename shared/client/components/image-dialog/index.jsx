import {
    Dialog,
    Image,
    Text
} from '@fluentui/react-northstar';
import classnames from 'classnames';

import './index.scss';

export default function ImageDialog({
    title,
    open,
    image,
    loading,
    className,
    onCancel,
    onConfirm,
    ...props
}) {
    const classNames = classnames('image-dialog', className);

    return (
        <Dialog
            header={title}
            open={open}
            className={classNames}
            content={image && {
                content: <>
                    <Image
                        src={image.src}
                        fluid
                    />
                    <Text as="p">Название: <Text temporary>{image.name}</Text></Text>
                    <Text as="p">Размер: <Text temporary>{Math.round(image.size / 1000)} КБ</Text></Text>
                </>
            }}
            cancelButton={{
                content: 'Отменить',
                onClick: onCancel
            }}
            confirmButton={{
                content: 'Загрузить',
                loading: loading,
                disabled: loading,
                onClick: onConfirm
            }}
            {...props}
        />
    );
}