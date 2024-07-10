import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import { useFileInput } from 'shared/hooks/file';
import { Button, ButtonGroup, Flex, FormField, Image, Text } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import './index.scss';

export default forwardRef(ImageField);

const defaultValue = {
    src: '',
    alt: ''
};

function ImageField({
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
    const [alt, setAlt] = useState(_alt);

    const { file, pick, reset } = useFileInput({
        name,
        accept: 'image/jpeg,image/png,image/jpeg,image/webp',
        onChange: file => {
            onChange?.({ name }, file);
        }
    });

    useImperativeHandle(ref, () => ({
        get file() {
            return file;
        },
        reset
    }));

    const handleDelete = useCallback(() => {
        onDelete?.(image);
    }, [image, onDelete]);

    return (
        <FormField
            className={cn(className, 'ImageField')}
            label={label}
            {...props}
        >
            {file &&
                <Flex gap="small" column>
                    <Image
                        src={file.url}
                        alt=""
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
                                    onClick: pick
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
                    <Image
                        src={src}
                        alt={alt}
                    />

                    <ButtonGroup
                        variant="plain"
                        buttons={[
                            {
                                key: 'pick',
                                icon: 'add_photo_alternate',
                                content: 'Выбрать изображение',
                                variant: 'plain',
                                disabled,
                                onClick: pick
                            },
                            {
                                key: 'reset',
                                icon: 'clear',
                                color: 'danger',
                                variant: 'plain',
                                content: 'Удалить изображение',
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
                    onClick={pick}
                />
            }
        </FormField>
    );
}