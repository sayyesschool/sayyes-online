import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

import ContentEditor from 'shared/components/content-editor';
import { Checkbox, Flex, Text } from 'shared/ui-components';

function FibItemForm({ content, required = false }, ref) {
    const editorRef = useRef();

    const [isRequired, setRequired] = useState(required);

    useImperativeHandle(ref, () => ({
        get props() {
            return {
                content: editorRef.current?.getData(),
                required: isRequired
            };
        }
    }));

    const handleChange = useCallback(event => {
        setRequired(event.target.checked);
    }, []);

    return (
        <>
            <ContentEditor
                ref={editorRef}
                content={content}
            />

            <Flex direction="column" px={2} py={1} spacing={1}>
                <Text as="small" type="body2">
                    Для текстового поля используйте <code>{'{ответ 1|ответ 2|ответ 3}'}</code>.<br />
                    Для выбора используйте <code>{'[ответ 1|ответ 2|ответ 3*]'}</code> (<sup>*</sup> отмечается правильный вариант).
                </Text>

                <Checkbox
                    label="Обязательно для заполнения"
                    checked={isRequired}
                    onChange={handleChange}
                />
            </Flex>
        </>
    );
}

export default forwardRef(FibItemForm);