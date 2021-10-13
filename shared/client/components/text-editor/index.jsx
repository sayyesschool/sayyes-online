import React, { forwardRef, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './index.scss';

export default forwardRef(TextEditor);

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
                config={{
                    mediaEmbed: {
                        previewsInData: true
                    }
                }}
                onChange={handleChange}
                {...props}
            />
        </div>
    );
}