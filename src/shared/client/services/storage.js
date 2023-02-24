const BASE_URL = 'https://storage.yandexcloud.net/sayyesonline';

const extensions = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

function getFilename(value, type) {
    const [name, extension = extensions[type]] = value.split('.');

    return `${name}.${extension}`;
}

export function uploadFile(file, options) {
    const formData = new FormData();

    formData.append('file', file);

    if (options?.path) {
        if (options.path.includes(BASE_URL)) {
            options.path = new URL(options.path).pathname.split('/').slice(2).join('/');
        }

        formData.append('path', options.path);
    }

    return fetch('/api/storage/' + options.path, {
        method: 'POST',
        body: formData
    }).then(response => response.json());
}

export function deleteFile(path) {
    if (path.includes(BASE_URL)) {
        path = new URL(path).pathname.split('/').slice(2).join('/');
    }

    return fetch('/api/storage/' + path, {
        method: 'DELETE',
    }).then(response => response.json());
}

export default {
    upload: uploadFile,
    delete: deleteFile
};