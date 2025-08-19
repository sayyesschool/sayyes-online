import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@sayyes/ckeditor5-classic';

import { defaultConfig, simpleConfig } from './configs';

function ContentEditor({
    value,
    content = value,
    placeholder,
    simple,
    uploadUrl,
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

    const config = Object.assign({ placeholder }, simple ? simpleConfig : uploadUrl ? {
        ...defaultConfig,
        uploadAdapter: {
            uploadUrl
        }
    } : defaultConfig);

    return (
        <div className="ContentEditor">
            <CKEditor
                ref={editorRef}
                editor={ClassicEditor}
                data={content}
                config={config}
                onChange={handleChange}
                {...props}
            />
        </div>
    );
}

export default forwardRef(ContentEditor);