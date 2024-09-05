import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import Cropper from 'react-cropper';

import { ButtonGroup, Dialog, Text } from 'shared/ui-components';
import { getFileFromURL } from 'shared/utils/file';

import 'cropperjs/dist/cropper.css';
import styles from './ImageCropper.module.scss';

export default forwardRef(ImageCropper);

const defaultImage = {
    src: '',
    alt: ''
};

function ImageCropper({
    image = defaultImage,
    imageSrc = image.src || image.url,
    open,
    disabled,
    onSave,
    onCancel,
    onClose
}, ref) {
    const cropperRef = useRef(null);

    useImperativeHandle(ref, () => ({
        get cropper() {
            return cropperRef.current;
        }
    }));

    const handleSave = useCallback(async () => {
        const cropperUrl = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
        const file = await getFileFromURL(cropperUrl);

        onSave(file);
        onClose();
    }, [onSave, onClose]);

    return (
        <Dialog
            title="Обрезка изображения"
            open={open}
            titleProps={{ level: 'h2' }}
            onClose={onClose}
        >
            <div className={styles.root}>
                <Cropper
                    ref={cropperRef}
                    className={styles.cropper}
                    src={imageSrc}
                    guides={false}
                    background={false}
                    viewMode={2}
                    aspectRatio={1}
                />

                <Text
                    type="body-md"
                    content={image.name}
                    end={
                        <Text as="span" type="body-xs">{Math.round(image.size / 1000)} КБ</Text>
                    }
                />

                <ButtonGroup
                    variant="plain"
                    buttons={[
                        {
                            key: 'reset',
                            content: 'Отменить',
                            icon: 'clear',
                            color: 'danger',
                            variant: 'plain',
                            disabled,
                            onClick: onCancel
                        },
                        {
                            key: 'save',
                            content: 'Сохранить',
                            icon: 'save',
                            color: 'success',
                            variant: 'plain',
                            disabled,
                            onClick: handleSave
                        }
                    ]}
                    buttonFlex={1}
                    spacing={1}
                />
            </div>
        </Dialog>
    );
}