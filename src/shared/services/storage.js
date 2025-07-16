import { request } from './http';

const STORAGE_API_URL = `${env.API_URL}/storage`;

export function uploadFile(file, { name, path } = {}) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('path', path);

    return request(STORAGE_API_URL, {
        method: 'POST',
        body: formData
    });
}

export function deleteFile(path) {
    return request(STORAGE_API_URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path })
    });
}

export default {
    upload: uploadFile,
    delete: deleteFile
};