import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

import ImageCropper from 'shared/components/image-cropper';
import { useFileInput } from 'shared/hooks/file';
import { useBoolean } from 'shared/hooks/state';
import { Button, ButtonGroup, Flex, FormField, Image, Text } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './ImageField.module.scss';

export default forwardRef(ImageField);

const defaultValue = {
    src: '',
    alt: ''
};

function ImageField({
    name,
    accept = 'image/jpeg,image/png,image/jpeg,image/webp',
    image = defaultValue,
    src = image?.src || image?.url || '',
    alt: _alt = image?.alt || '',
    noImage,
    error,
    errorMessage,
    cropperOptions,
    disabled,
    onChange,
    onDelete,

    className,
    ...props
}, ref) {
    const [alt, setAlt] = useState(_alt);
    const [isCropperOpen, toggleCropperOpen] = useBoolean(false);

    const { file, setFile, pick, reset } = useFileInput({
        name,
        accept,
        onChange: () => toggleCropperOpen(true)
    });

    useEffect(() => {
        return () => {
            if (file?.url && file.url.startsWith('blob:')) {
                URL.revokeObjectURL(file.url);
            }
        };
    }, [file]);

    useImperativeHandle(ref, () => ({
        get file() { return file; },
        getFile: () => file,
        pick,
        reset
    }));

    const handlePick = useCallback(() => {
        pick();
        toggleCropperOpen(true);
    }, [pick, toggleCropperOpen]);

    const handleSave = useCallback(file => {
        file.url = URL.createObjectURL(file);
        setFile(file);
        onChange?.(file)
            .finally(() => {
                toggleCropperOpen(false);
                reset();
            });
    }, [onChange, reset, setFile, toggleCropperOpen]);

    const handleDelete = useCallback(() => {
        onDelete?.(image)
            .finally(() => {
                reset();
            });
    }, [image, onDelete, reset]);

    const handleCancel = useCallback(() => {
        reset();
    }, [reset]);

    return (
        <FormField
            className={cn(className, styles.root)}
            {...props}
        >
            {file &&
                <Flex gap="small" column>
                    {!noImage &&
                        <Image
                            src={file.url}
                            alt=""
                        />
                    }

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
                            className={styles.buttons}
                            variant="plain"
                            buttons={[
                                {
                                    key: 'pick',
                                    icon: 'add_photo_alternate',
                                    content: 'Выбрать другое',
                                    variant: 'plain',
                                    disabled,
                                    onClick: handlePick
                                },
                                {
                                    key: 'reset',
                                    icon: 'clear',
                                    color: 'danger',
                                    variant: 'plain',
                                    content: 'Отменить выбор',
                                    disabled,
                                    onClick: reset
                                }
                            ]}
                            buttonFlex={1}
                            spacing={1}
                        />
                    </Flex>
                </Flex>
            }

            {src && !file &&
                <Flex gap="small" column>
                    {!noImage &&
                        <Image
                            src={src}
                            alt={alt}
                        />
                    }

                    <ButtonGroup
                        className={styles.buttons}
                        variant="plain"
                        buttons={[
                            {
                                key: 'pick',
                                icon: 'add_photo_alternate',
                                content: 'Изменить',
                                variant: 'plain',
                                disabled,
                                onClick: pick
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
                <Button
                    icon="add_photo_alternate"
                    content="Выбрать изображение"
                    variant="outlined"
                    disabled={disabled}
                    onClick={pick}
                />
            }

            {file &&
                <ImageCropper
                    image={file}
                    open={isCropperOpen}
                    disabled={disabled}
                    options={cropperOptions}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onClose={toggleCropperOpen}
                />
            }
        </FormField>
    );
}