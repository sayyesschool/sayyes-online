import { forwardRef, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@sayyes/ckeditor5-classic';

import { UploadAdapterPlugin } from 'shared/libs/text-editor/upload-adapter';
import ImageRemoveEventPlugin from 'shared/libs/text-editor/image-remove-event';

import './index.scss';

export default forwardRef(TextEditor);

const config = {
    language: 'ru',
    mediaEmbed: {
        previewsInData: true
    },
    extraPlugins: [UploadAdapterPlugin, ImageRemoveEventPlugin],
    uploadAdapter: {
        uploadUrl: '/api/storage/images'
    },
    imageRemoveEvent: {
        callback: (imagesSrc, nodeObjects) => {
            return Promise.allSettled(imagesSrc.map(src => {
                const pathSegments = new URL(src).pathname.split('/');
                const filename = pathSegments[pathSegments.length - 1];

                return fetch(`/api/storage/images/${filename}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(res => console.log(res));
            }));
        }
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