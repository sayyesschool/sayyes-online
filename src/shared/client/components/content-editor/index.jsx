import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@sayyes/ckeditor5-classic';

import { defaultConfig, simpleConfig } from './configs';

import './index.scss';

function ContentEditor({
    value,
    content = value,
    simple,
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
        <div className="ContentEditor">
            <CKEditor
                ref={editorRef}
                editor={ClassicEditor}
                data={content}
                config={simple ? simpleConfig : defaultConfig}
                onChange={handleChange}
                {...props}
            />
        </div>
    );
}

export default forwardRef(ContentEditor);