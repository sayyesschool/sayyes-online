export function uploadFile(file, { name, path }) {
    const formData = new FormData();
    const [_name, extension] = file.name.split('.');
    const filename = `${name || _name}.${extension}`;

    formData.append('file', file, filename);
    formData.append('path', path);

    return fetch('http://localhost:8080/upload-image.php', {
        method: 'POST',
        body: formData
    }).then(response => response.json());
}

export function deleteFile(path) {
    const formData = new FormData();

    formData.append('path', path);

    return fetch('http://localhost:8080/delete.php', {
        method: 'POST',
        body: formData
    }).then(response => response.json());
}