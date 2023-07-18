import { forwardRef, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@sayyes/ckeditor5-classic';

import { UploadAdapterPlugin } from 'shared/libs/text-editor/upload-adapter';
import ImageRemoveEventPlugin from 'shared/libs/text-editor/image-remove-event';

import './index.scss';

const defaultConfig = {
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
                name: 'List',
                element: 'ul',
                classes: ['my-list']
            },
            {
                name: 'Важный текст',
                element: 'p',
                classes: ['primary-text']
            },
            {
                name: 'Вспомогательный текст',
                element: 'p',
                classes: ['secondary-text']
            },
            {
                name: 'Декоративный текст',
                element: 'p',
                classes: ['decorative-text']
            },
            {
                name: 'Текст диалога',
                element: 'p',
                classes: ['dialog-text']
            },
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
    content,
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
                data={content}
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