import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import Cropper from 'react-cropper';

// import FormDialog from 'shared/components/form-dialog';
import { useFileInput } from 'shared/hooks/file';
import Storage from 'shared/services/storage';
import { Avatar, Button, ButtonGroup, Dialog, Flex, FormField, Image, Text } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import 'cropperjs/dist/cropper.css';
import styles from './ImageFieldCropper.module.scss';

export default forwardRef(ImageFieldCropper);

// TODO: лучше хранить локально
const emptyAvatarSrc = 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';

// TODO: обязательно исправить этот момент
const getCorrectSrc = src => src.replace('sayyesonline', 'sayyesonline-dev');

const defaultValue = {
    src: '',
    alt: ''
};

async function URLtoFile(url) {
    const res = await fetch(url);
    const blob = await res.blob();

    const mime = blob.type;
    const ext = mime.slice(mime.lastIndexOf('/') + 1, mime.length);

    const file = new File([blob], `filename.${ext}`, {
        type: mime
    });

    return file;
}

function ImageFieldCropper({
    name,
    label,
    accept = 'image/jpeg,image/png,image/jpeg',
    image = defaultValue,
    src = image.src || image.url,
    alt: _alt = image.alt,
    error,
    errorMessage,
    disabled,
    onChange,
    onDelete,

    className,
    ...props
}, ref) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const cropperRef = useRef(null);
    const { file, pick, reset } = useFileInput({
        name,
        accept: 'image/jpeg,image/png,image/jpeg,image/webp'
    });

    useImperativeHandle(ref, () => ({
        get file() {
            return file;
        },
        reset
    }));

    const onCrop = async () => {
        const cropperUrl = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
        const file = await URLtoFile(cropperUrl);
        // TODO: поменять путь с lexemes на avatars
        const response = await Storage.upload(file, { path: 'lexemes' });

        onChange({ path: response.data.path });
        setDialogOpen(false);
        reset();
    };

    const handleDelete = useCallback(() => {
        onDelete?.(image.path);
        onChange({});
    }, [image.path, onChange, onDelete]);

    const openModal = useCallback(() => {
        pick();
        setDialogOpen(true);
    }, [pick]);

    return (
        <FormField
            className={cn(className, 'ImageFieldCropper')}
            label={label}
            {...props}
        >
            {file && isDialogOpen &&
                <Dialog
                    title="Обрезка изображения"
                    open={isDialogOpen}
                    titleProps={{ level: 'h2' }}
                    onClose={reset}
                >
                    <Flex
                        gap="small"
                        column
                    >
                        <Cropper
                            ref={cropperRef}
                            src={file.url}
                            guides={false}
                            style={{ height: '100%', width: '100%' }}
                            background={false}
                            viewMode={2}
                            aspectRatio={1}
                        />

                        <Flex
                            gap="smaller"
                            column
                        >
                            <Text
                                type="body-md"
                                content={file.name}
                                end={
                                    <Text as="span" type="body-xs">{Math.round(file.size / 1000)} КБ</Text>
                                }
                            />

                            <ButtonGroup
                                variant="plain"
                                buttons={[
                                    {
                                        key: 'pick',
                                        icon: 'add_photo_alternate',
                                        content: 'Выбрать другое',
                                        variant: 'plain',
                                        disabled,
                                        onClick: openModal
                                    },
                                    {
                                        key: 'reset',
                                        icon: 'clear',
                                        color: 'danger',
                                        variant: 'plain',
                                        content: 'Отменить выбор',
                                        disabled,
                                        onClick: reset
                                    },
                                    {
                                        key: 'save',
                                        icon: 'save',
                                        color: 'success',
                                        variant: 'plain',
                                        content: 'Сохранить',
                                        disabled,
                                        onClick: onCrop
                                    }
                                ]}
                                buttonFlex={1}
                                spacing={1}
                            />
                        </Flex>
                    </Flex>
                </Dialog>
            }

            {src && !file &&
                <Flex
                    gap="small"
                    className={styles.avatarBlock}
                    column
                >
                    <Avatar
                        variant="outlined"
                        imageUrl={getCorrectSrc(src)}
                        sx={{ width: '200px', height: '200px' }}
                    />

                    <ButtonGroup
                        variant="plain"
                        buttons={[
                            {
                                key: 'pick',
                                icon: 'add_photo_alternate',
                                content: 'Изменить',
                                variant: 'plain',
                                disabled,
                                onClick: openModal
                            },
                            {
                                key: 'reset',
                                icon: 'clear',
                                color: 'danger',
                                variant: 'plain',
                                content: 'Удалить',
                                disabled,
                                onClick: handleDelete
                            }
                        ]}
                        buttonFlex={1}
                        spacing={1}
                    />
                </Flex>
            }

            {!src && !file &&
                <div className={styles.avatarBlock}>
                    <Avatar
                        variant="outlined"
                        imageUrl={emptyAvatarSrc}
                        sx={{ width: '200px', height: '200px' }}
                    />

                    <Button
                        icon="add_photo_alternate"
                        content="Выбрать изображение"
                        variant="outlined"
                        onClick={openModal}
                    />
                </div>
            }
        </FormField>
    );
}