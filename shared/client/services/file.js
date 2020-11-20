import { nanoid } from 'nanoid';

export function uploadFile(file, { name = nanoid(16), path }) {
    const formData = new FormData();
    const filename = getFilename(name, file.type);

    formData.append('file', file, filename);
    formData.append('path', file.path || path);

    return fetch(`${STATIC_URL}/upload-image.php`, {
        method: 'POST',
        body: formData
    }).then(response => response.json());
}

export function deleteFile(path) {
    return fetch(`${STATIC_URL}/delete.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ path }).toString()
    }).then(response => response.json());
}

const extensions = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

function getFilename(value, type) {
    const [name, extension = extensions[type]] = value.split('.');

    return `${name}.${extension}`;
}