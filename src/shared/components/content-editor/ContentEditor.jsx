import { forwardRef, useCallback, useContext, useImperativeHandle, useRef } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@sayyes/ckeditor5-classic';

import { defaultConfig, simpleConfig } from './configs';
import context from './context';

function ContentEditor({
    value,
    content = value,
    placeholder,
    simple,
    uploadPath: _uploadPath,
    onChange = Function.prototype,
    ...props
}, ref) {
    const { uploadPath = _uploadPath } = useContext(context);

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

    const config = Object.assign({ placeholder }, simple ? simpleConfig : uploadPath ? {
        ...defaultConfig,
        uploadAdapter: {
            ...defaultConfig.uploadAdapter,
            uploadPath
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