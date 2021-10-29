import { forwardRef, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@sayyes/ckeditor5-classic';

import './index.scss';

export default forwardRef(TextEditor);

const config = {
    language: 'ru',
    mediaEmbed: {
        previewsInData: true
    },
    ckfinder: {
        uploadUrl: 'https://static.sayyesonline.ru/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
    }
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