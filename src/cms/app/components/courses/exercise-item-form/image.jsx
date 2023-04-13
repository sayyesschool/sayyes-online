import { forwardRef, useImperativeHandle, useRef } from 'react';

import { useFileInput } from 'shared/hooks/file';
import { Button, Flex, Input, Image, Text } from 'shared/ui-components';

function ExerciseImageItem({ item }, ref) {
    const inputRef = useRef();

    const { file, pick } = useFileInput({ accept: 'image/jpeg,image/png,image/jpeg,image/webp' });

    useImperativeHandle(ref, () => ({
        get data() {
            const value = inputRef.current?.value;

            if (file) {
                file.path = item.image?.path || `courses/${item.courseId}/images/`;
            }

            return {
                image: {
                    ...item.image,
                    caption: value === undefined ? item.image?.caption : value
                },
                file
            };
        }
    }), [item, file]);

    return (
        <Flex padding={1} gap="small" column>
            {file &&
                <>
                    <Text type="body2">Выбранное изображение:</Text>

                    <div
                        className="exercise-item-form__image-wrapper"
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
                </>
            }

            {!file && item.image &&
                <div
                    className="exercise-item-form__image-wrapper"
                    onClick={pick}
                >
                    <Image
                        src={item.image?.url}
                        alt=""
                        fluid
                    />
                </div>
            }

            {!file && !item.image ?
                <Button
                    type="button"
                    content="Выбрать файл"
                    variant="plain"
                    size="sm"
                    onClick={pick}
                />
                :
                <Input
                    ref={inputRef}
                    placeholder="Описание"
                    name="caption"
                    defaultValue={item.image?.caption}
                />
            }
        </Flex>
    );
}

export default forwardRef(ExerciseImageItem);