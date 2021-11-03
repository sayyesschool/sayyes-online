import { forwardRef, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@sayyes/ckeditor5-classic';

import { UploadAdapterPlugin } from 'shared/libs/upload-adapter';

import './index.scss';

export default forwardRef(TextEditor);

const config = {
    language: 'ru',
    mediaEmbed: {
        previewsInData: true
    },
    extraPlugins: [UploadAdapterPlugin]
};

function TextEditor({
    value,
    defaultValue = value,
    onChange = Function.prototype,
    ...props
}, ref) {
    const handleChange = useCallback((event, editor) => {
        onChange(event, editor.getData());
    }, [onChange]);

    return (
        <div className="text-editor">
            <CKEditor
                ref={ref}
                editor={ClassicEditor}
                data={defaultValue}
                config={config}
                onChange={handleChange}
                {...props}
            />
        </div>
    );
}