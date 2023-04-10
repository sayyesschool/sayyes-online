import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import TextEditor from 'shared/components/text-editor';

function ExerciseTextItem({ item }, ref) {
    const [text, setText] = useState(item.text || '');

    useImperativeHandle(ref, () => ({
        get data() { return { text }; }
    }));

    const handleChange = useCallback((event, value) => {
        setText(value);
    }, []);

    return (
        <TextEditor
            value={item.text}
            onChange={handleChange}
        />
    );
}

export default forwardRef(ExerciseTextItem);