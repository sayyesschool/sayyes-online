const STORAGE_API_URL = `${env.API_URL}/storage`;

export function uploadFile(file, { name, path } = {}) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('path', path);

    return fetch(STORAGE_API_URL, {
        method: 'POST',
        body: formData
    }).then(response => response.json());
}

export function deleteFile(path) {
    return fetch(STORAGE_API_URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path
        })
    }).then(response => response.json());
}

export default {
    upload: uploadFile,
    delete: deleteFile
};