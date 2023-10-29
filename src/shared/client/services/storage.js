const BASE_URL = 'https://storage.yandexcloud.net/sayyesonline';

const extensions = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

export function uploadFile(file, { name, path } = {}) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('path', normalizePath(path));

    return fetch('/api/storage', {
        method: 'POST',
        body: formData
    }).then(response => response.json());
}

export function deleteFile(path) {
    return fetch('/api/storage', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        data: Object.stringify({
            path: normalizePath(path)
        })
    }).then(response => response.json());
}

function getFilename(value, type) {
    const [name, extension = extensions[type]] = value.split('.');

    return `${name}.${extension}`;
}

function normalizePath(path) {
    if (path.includes(BASE_URL)) {
        return new URL(path).pathname.split('/').slice(2).join('/');
    } else {
        return path;
    }
}

export default {
    upload: uploadFile,
    delete: deleteFile
};