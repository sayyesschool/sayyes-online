import { forwardRef, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@sayyes/ckeditor5-classic';

import { UploadAdapterPlugin } from 'shared/libs/text-editor/upload-adapter';
import ImageRemoveEventPlugin from 'shared/libs/text-editor/image-remove-event';

import './index.scss';

const defaultConfig = {
    language: 'ru',
    mediaEmbed: {
        previewsInData: true
    },
    extraPlugins: [UploadAdapterPlugin, ImageRemoveEventPlugin],
    uploadAdapter: {
        uploadUrl: '/api/storage/images'
    },
    style: {
        definitions: [
            {
                name: 'Основной цвет',
                element: 'span',
                classes: ['ck-primary-color']
            },
            {
                name: 'Второстепенный цвет',
                element: 'span',
                classes: ['ck-secondary-color']
            },
            {
                name: 'Приглушенный цвет',
                element: 'span',
                classes: ['ck-muted-color']
            },
            {
                name: 'Word Bubble',
                element: 'span',
                classes: ['word-bubble']
            }
        ]
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

function ContentEditor({
    value,
    defaultValue = value,
    config,
    onChange = Function.prototype,
    ...props
}, ref) {
    const handleChange = useCallback((event, editor) => {
        onChange(event, editor.getData());
    }, [onChange]);

    return (
        <div className="ContentEditor">
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

export default forwardRef(ContentEditor);