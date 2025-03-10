import { forwardRef, useImperativeHandle, useRef } from 'react';

import ContentEditor from 'shared/components/content-editor';
import VideoPlayer from 'shared/components/video-player';
import { Flex, Input } from 'shared/ui-components';

import './video.scss';

function ExerciseVideoItem({
    path,
    url,
    script
}, ref) {
    const editorRef = useRef();
    const pathInputRef = useRef();

    useImperativeHandle(ref, () => ({
        get props() {
            const pathValue = pathInputRef.current?.value;
            const script = editorRef.current?.getData();

            return {
                path: pathValue === undefined ? path : pathValue,
                script
            };
        }
    }), [path]);

    return (
        <Flex
            padding={1} gap="small"
            column
        >
            {url &&
                <VideoPlayer
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
        </Flex>
    );
}

export default forwardRef(ExerciseVideoItem);