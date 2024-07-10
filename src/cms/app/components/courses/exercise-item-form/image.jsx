import { forwardRef, useImperativeHandle, useRef } from 'react';

import { useFileInput } from 'shared/hooks/file';
import { Button, Flex, Image, Input, Text } from 'shared/ui-components';

import './image.scss';

function ExerciseImageItem({
    url,
    path,
    caption
}, ref) {
    const pathInputRef = useRef();
    const captionInputRef = useRef();

    const { file, pick } = useFileInput({
        accept: 'image/jpeg,image/png,image/jpeg,image/webp'
    });

    useImperativeHandle(ref, () => ({
        get file() {
            return file;
        },
        get props() {
            const pathValue = pathInputRef.current?.value;
            const captionValue = captionInputRef.current?.value;

            return {
                path: pathValue === undefined ? path : pathValue,
                caption: captionValue === undefined ? caption : captionValue
            };
        }
    }), [file]);

    return (
        <Flex
            gap="small"
            padding={1}
            column
        >
            {file && <>
                <Text type="body2">Выбранное изображение:</Text>

                <figure className="ImageItemForm__image">
                    <Image
                        src={file.url}
                        alt=""
                    />
                </figure>

                <div>
                    <Text type="body2">Название: <b>{file.name}</b></Text>
                    <Text type="body2">Размер: <b>{Math.round(file.size / 1000)} КБ</b></Text>
                </div>
            </>}

            {!file && <>
                {url &&
                    <figure className="ImageItemForm__image">
                        <Image
                            src={url}
                            alt=""
                        />
                    </figure>
                }

                <Input
                    inputRef={pathInputRef}
                    placeholder="Путь"
                    defaultValue={path}
                    readOnly={Boolean(path)}
                />

                <Input
                    inputRef={captionInputRef}
                    placeholder="Описание"
                    defaultValue={caption}
                />
            </>}

            <Button
                type="button"
                content={url ? 'Выбрать другое изображение' : 'Выбрать изображение'}
                variant="outlined"
                size="sm"
                onClick={pick}
            />
        </Flex>
    );
}

export default forwardRef(ExerciseImageItem);