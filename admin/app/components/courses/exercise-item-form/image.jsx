import { forwardRef, useImperativeHandle, useRef } from 'react';
import {
    Box,
    Button,
    Flex,
    Input,
    Image,
    Text
} from '@fluentui/react-northstar';

import { useFileInput } from 'shared/hooks/file';

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
        <Flex padding="padding.medium" gap="gap.small" column>
            {file &&
                <>
                    <Text size="small">Выбранный файл:</Text>

                    <Box
                        className="exercise-item-form__image-wrapper"
                        onClick={pick}
                    >
                        <Image
                            src={file.url}
                            alt=""
                        />
                    </Box>

                    <Text as="p">
                        Название: <Text temporary>{file.name}</Text>
                        <br />
                        Размер: <Text temporary>{Math.round(file.size / 1000)} КБ</Text>
                    </Text>
                </>
            }

            {!file && item.image &&
                <Box
                    className="exercise-item-form__image-wrapper"
                    onClick={pick}
                >
                    <Image
                        src={item.image?.url}
                        alt=""
                        fluid
                    />
                </Box>
            }

            {!file && !item.image ?
                <Button
                    type="button"
                    content="Выбрать файл"
                    onClick={pick}
                />
                :
                <Input
                    ref={inputRef}
                    type="text"
                    label="Описание"
                    name="caption"
                    defaultValue={item.image?.caption}
                    fluid
                />
            }
        </Flex>
    );
}

export default forwardRef(ExerciseImageItem);