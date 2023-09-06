import { forwardRef, useImperativeHandle, useRef } from 'react';

import { useFileInput } from 'shared/hooks/file';
import AudioPlayer from 'shared/components/audio-player';
import ContentEditor from 'shared/components/content-editor';
import { Button, Flex, Input, Text } from 'shared/ui-components';

import './audio.scss';

function AudioItemForm({
    path,
    url,
    script
}, ref) {
    const editorRef = useRef();
    const pathInputRef = useRef();

    const { file, pick } = useFileInput({ accept: 'audio/mpeg' });

    useImperativeHandle(ref, () => ({
        get file() {
            return file;
        },
        get props() {
            const pathValue = pathInputRef.current?.value;
            const script = editorRef.current?.getData();

            return {
                path: pathValue === undefined ? path : pathValue,
                script
            };
        }
    }), [file, path]);

    return (
        <Flex padding={1} gap="small" column>
            {file &&
                <Flex padding="medium" gap="small" column>
                    <Text size="small">Выбранный файл:</Text>

                    <AudioPlayer
                        src={file.url}
                    />

                    <Text as="p">
                        Название: <b>{file.name}</b>
                        <br />
                        Размер: <b>{Math.round(file.size / 1000)} КБ</b>
                    </Text>
                </Flex>
            }

            {!file && <>
                {url &&
                    <AudioPlayer
                        src={url}
                    />
                }

                <Input
                    inputRef={pathInputRef}
                    placeholder="Путь"
                    defaultValue={path}
                    readOnly={Boolean(path)}
                />

                <ContentEditor
                    ref={editorRef}
                    content={script}
                />
            </>}

            <Button
                type="button"
                content={url ? 'Выбрать другой файл' : 'Выбрать файл'}
                variant="outlined"
                size="sm"
                onClick={pick}
            />
        </Flex>
    );
}

export default forwardRef(AudioItemForm);