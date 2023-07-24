import { UploadAdapterPlugin } from 'shared/libs/editor/upload-adapter';
import ImageRemoveEventPlugin from 'shared/libs/editor/image-remove-event';

export const defaultConfig = {
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
                name: 'Инструкции',
                element: 'p',
                classes: ['directions']
            },
            {
                name: 'Диалог',
                element: 'blockquote',
                classes: ['dialog']
            },
            {
                name: 'Сноска',
                element: 'blockquote',
                classes: ['callout']
            },
            {
                name: 'Блок слева',
                element: 'blockquote',
                classes: ['float-left']
            },
            {
                name: 'Блок справа',
                element: 'blockquote',
                classes: ['float-right']
            },
            {
                name: 'Сетка',
                element: 'table',
                classes: ['grid']
            },
            {
                name: 'Закрашенная клетка',
                element: 'td',
                classes: ['filled-cell']
            },
            {
                name: 'Приглушенная клетка',
                element: 'td',
                classes: ['tinted-cell']
            },
            {
                name: 'Список слов для выбора',
                element: 'ul',
                classes: ['word-choice-list']
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
            },
            {
                name: 'Заглавные буквы',
                element: 'span',
                classes: ['text-uppercase']
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

export const simpleConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'undo',
            'redo'
        ]
    },
    list: {
        properties: {
            styles: false,
            startIndex: false,
            reversed: false
        }
    }
};