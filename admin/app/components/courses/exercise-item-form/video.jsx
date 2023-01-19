import { forwardRef, useImperativeHandle, useRef } from 'react';

import TextEditor from 'shared/components/text-editor';
import VideoPlayer from 'shared/components/video-player';

function ExerciseVideoItem({ item }, ref) {
    const textEditorRef = useRef();

    useImperativeHandle(ref, () => ({
        get data() {
            const script = textEditorRef.current?.editor.getData();

            return {
                video: {
                    ...item.video,
                    script
                }
            };
        }
    }), [item]);

    return (
        <>
            {item.video?.url &&
                <VideoPlayer
                    src={item.video?.url}
                />
            }

            <TextEditor
                ref={textEditorRef}
                value={item.video?.script}
            />
        </>
    );
}

export default forwardRef(ExerciseVideoItem);