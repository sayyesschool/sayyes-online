import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import TextEditor from 'shared/components/text-editor';

function ExerciseEssayForm({ item }, ref) {
    const [text, setText] = useState(item.text || '');

    useImperativeHandle(ref, () => ({
        get data() { return { text }; }
    }));

    const handleTextChange = useCallback((event, value) => {
        setText(value);
    }, []);

    return (
        <TextEditor
            value={text}
            onChange={handleTextChange}
        />
    );
}

export default forwardRef(ExerciseEssayForm);