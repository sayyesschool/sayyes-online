import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
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
                name: 'Задание',
                element: 'p',
                classes: ['exercise-description']
            },
            {
                name: 'Перевод задания',
                element: 'p',
                classes: ['exercise-description-translation']
            },
            {
                name: 'Список слов для выбора',
                element: 'ul',
                classes: ['word-choice-list']
            },
            {
                name: 'Диалог',
                element: 'blockquote',
                classes: ['dialog']
            },
            {
                name: 'Основной цвет',
                element: 'span',
                classes: ['primary-color']
            },
            {
                name: 'Второстепенный цвет',
                element: 'span',
                classes: ['secondary-color']
            },
            {
                name: 'Приглушенный цвет',
                element: 'span',
                classes: ['muted-color']
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

    return (
        <div className="ContentEditor">
            <CKEditor
                ref={editorRef}
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