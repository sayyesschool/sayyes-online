import { forwardRef, useImperativeHandle, useRef } from 'react';

import { useFileInput } from 'shared/hooks/file';
import { Button, Flex, Text } from 'shared/ui-components';
import AudioPlayer from 'shared/components/audio-player';
import TextEditor from 'shared/components/text-editor';

function ExerciseAudioItem({ item }, ref) {
    const textEditorRef = useRef();

    const { file, pick } = useFileInput({ accept: 'audio/mpeg' });

    useImperativeHandle(ref, () => ({
        get data() {
            const script = textEditorRef.current?.editor.getData();

            if (file) {
                file.path = item.audio?.path || `courses/${item.courseId}/audios/`;
            }

            return {
                audio: {
                    ...item.audio,
                    script
                },
                file
            };
        }
    }), [item, file]);

    return (
        <>
            {file &&
                <Flex padding="padding.medium" gap="gap.small" column>
                    <Text size="small">Выбранный файл:</Text>

                    <AudioPlayer
                        src={file.url}
                    />

                    <Text as="p">
                        Название: <Text temporary>{file.name}</Text>
                        <br />
                        Размер: <Text temporary>{Math.round(file.size / 1000)} КБ</Text>
                    </Text>
                </Flex>
            }

            {!file && item.audio &&
                <>
                    <AudioPlayer
                        src={item.audio.url}
                    />

                    <TextEditor
                        ref={textEditorRef}
                        value={item.audio.script}
                    />
                </>
            }

            <Button
                type="button"
                content="Выбрать файл"
                fluid
                text
                onClick={pick}
            />
        </>
    );
}

export default forwardRef(ExerciseAudioItem);