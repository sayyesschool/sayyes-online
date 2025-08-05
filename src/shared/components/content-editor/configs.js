import { STORAGE_API } from 'shared/constants';
import ImageRemoveEventPlugin from 'shared/libs/editor/image-remove-event';
import { UploadAdapterPlugin } from 'shared/libs/editor/upload-adapter';

export const defaultConfig = {
    mediaEmbed: {
        previewsInData: true
    },
    extraPlugins: [UploadAdapterPlugin, ImageRemoveEventPlugin],
    uploadAdapter: {
        uploadUrl: STORAGE_API
    },
    style: {
        definitions: [
            {
                name: 'Инструкции',
                element: 'p',
                classes: ['directions']
            },
            {
                name: 'Надпись',
                element: 'p',
                classes: ['overline']
            },
            // {
            //     name: 'Подпись',
            //     element: 'p',
            //     classes: ['caption']
            // },
            {
                name: 'Номер',
                element: 'p',
                classes: ['number']
            },
            {
                name: 'Нумерация',
                element: 'p',
                classes: ['numbered']
            },
            {
                name: 'Диалог',
                element: 'blockquote',
                classes: ['dialog']
            },
            {
                name: 'Пример',
                element: 'blockquote',
                classes: ['example']
            },
            {
                name: 'Сноска',
                element: 'blockquote',
                classes: ['callout']
            },
            {
                name: 'Сноска "Error"',
                element: 'blockquote',
                classes: ['callout', 'callout-error']
            },
            {
                name: 'Сноска "Note"',
                element: 'blockquote',
                classes: ['callout', 'callout-note']
            },
            {
                name: 'Сноска "Tip"',
                element: 'blockquote',
                classes: ['callout', 'callout-tip']
            },
            {
                name: 'Список выбора слов',
                element: 'ul',
                classes: ['word-choice-list']
            },
            {
                name: 'Список сопоставления',
                element: 'ol',
                classes: ['match-list']
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
                if (!src) return;

                const pathSegments = new URL(src).pathname.split('/');
                const filename = pathSegments[pathSegments.length - 1];

                return fetch(`${STORAGE_API}/images/${filename}`, {
                    method: 'DELETE'
                }).then(res => res.json());
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