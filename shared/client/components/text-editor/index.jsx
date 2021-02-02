import React, { forwardRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './index.scss';

export default forwardRef(TextEditor);

function TextEditor({ value, defaultValue = value }, ref) {
    return (
        <div className="text-editor">
            <CKEditor
                ref={ref}
                editor={ClassicEditor}
                data={defaultValue}
            />
        </div>
    );
}