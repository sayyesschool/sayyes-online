import { forwardRef, useImperativeHandle, useRef } from 'react';

import { useFileInput } from 'shared/hooks/file';
import { Button, Flex, Input, Image, Text } from 'shared/ui-components';

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
        <Flex padding={1} gap="small" column>
            {file && <>
                <Text type="body2">Выбранное изображение:</Text>

                <div
                    className="ImageItemForm__image-wrapper"
                    onClick={pick}
                >
                    <Image
                        src={file.url}
                        alt=""
                    />
                </div>

                <div>
                    <Text type="body2">Название: <b>{file.name}</b></Text>
                    <Text type="body2">Размер: <b>{Math.round(file.size / 1000)} КБ</b></Text>
                </div>
            </>}

            {!file && url && <>
                <div
                    className="ImageItemForm__image-wrapper"
                    onClick={pick}
                >
                    <Image
                        src={url}
                        alt=""
                        fluid
                    />
                </div>

                <Input
                    inputRef={pathInputRef}
                    placeholder="Путь"
                    defaultValue={path}
                    readOnly={Boolean(path)}
                />
            </>}

            {!file && !url ?
                <Button
                    type="button"
                    content="Выбрать файл"
                    variant="outlined"
                    size="sm"
                    onClick={pick}
                />
                :
                <Input
                    inputRef={captionInputRef}
                    placeholder="Описание"
                    defaultValue={caption}
                />
            }
        </Flex>
    );
}

export default forwardRef(ExerciseImageItem);