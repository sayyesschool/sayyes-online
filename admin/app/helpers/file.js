export function upload(file, { name, path }) {
    const formData = new FormData();
    const [_name, extension] = file.name.split('.');
    const filename = `${name || _name}.${extension}`;

    formData.append('file', file, filename);
    formData.append('path', path);

    return fetch('https://static.sayes.ru/upload-image.php', {
        method: 'POST',
        body: formData
    }).then(response => response.json());
}