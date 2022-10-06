import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import Text from 'shared/ui-components/text';
import TextEditor from 'shared/components/text-editor';

function ExerciseFIBItem({ item }, ref) {
    const [text, setText] = useState(item.text || '');

    useImperativeHandle(ref, () => ({
        get data() { return { text }; }
    }));

    const handleChange = useCallback((event, value) => {
        setText(value);
    }, [item]);

    return (
        <>
            <TextEditor
                value={text}
                onChange={handleChange}
            />

            <Text as="small" size="small">Для текстового поля используйте <code>{'{ответ 1|ответ 2|ответ 3}'}</code>. Для выбора используйте <code>{'[ответ 1|ответ 2|ответ 3*]'}</code></Text>
        </>
    );
}

export default forwardRef(ExerciseFIBItem);