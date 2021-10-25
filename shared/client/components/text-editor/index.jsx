import { forwardRef, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ru';

import './index.scss';

export default forwardRef(TextEditor);

const config = {
    language: 'ru',
    // toolbar: [
    //     'heading', '|',
    //     'fontfamily', 'fontsize', '|',
    //     'alignment', '|',
    //     'fontColor', 'fontBackgroundColor', '|',
    //     'bold', 'italic', 'strikethrough', 'underline', '|',
    //     'link', '|',
    //     'outdent', 'indent', '|',
    //     'bulletedList', 'numberedList', '|',
    //     'insertTable', '|',
    //     'uploadImage', 'blockQuote', '|',
    //     'undo', 'redo'
    // ],
    mediaEmbed: {
        previewsInData: true
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