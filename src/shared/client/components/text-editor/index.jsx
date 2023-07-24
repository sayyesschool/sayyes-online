import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@sayyes/ckeditor5-classic';

import './index.scss';

export default forwardRef(TextEditor);

const defaultConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'undo',
            'redo'
        ]
    },
    list: {
        properties: {
            styles: false,
            startIndex: false,
            reversed: false
        }
    }
};

function TextEditor({
    text,
    value = text,
    defaultValue = value,
    config,
    onChange = Function.prototype,
    ...props
}, ref) {
    const editorRef = useRef();

    useImperativeHandle(ref, () => ({
        getData: () => editorRef.current?.editor.getData()
            .trim()
            .replaceAll('&nbsp;', ' ')
            .replaceAll('<p> </p>', '<p></p>')
    }));

    const handleChange = useCallback((event, editor) => {
        onChange(event, editor.getData());
    }, [onChange]);

    return (
        <div className="TextEditor">
            <CKEditor
                ref={ref}
                editor={ClassicEditor}
                data={defaultValue}
                config={config ? {
                    ...defaultConfig,
                    ...config
                } : defaultConfig}
                onChange={handleChange}
                {...props}
            />
        </div>
    );
}