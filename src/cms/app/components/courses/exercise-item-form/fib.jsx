import { forwardRef, useImperativeHandle, useRef } from 'react';

import ContentEditor from 'shared/components/content-editor';
import { Text } from 'shared/ui-components';

function FibItemForm({ content }, ref) {
    const editorRef = useRef();

    useImperativeHandle(ref, () => ({
        get props() {
            return {
                content: editorRef.current?.getData()
            };
        }
    }));

    return (
        <>
            <ContentEditor
                ref={editorRef}
                content={content}
            />

            <Text px={2} py={1} as="small" type="body2">Для текстового поля используйте <code>{'{ответ 1|ответ 2|ответ 3}'}</code>.<br />Для выбора используйте <code>{'[ответ 1|ответ 2|ответ 3*]'}</code> (<sup>*</sup> отмечается правильный вариант).</Text>
        </>
    );
}

export default forwardRef(FibItemForm);