export function upload(file, options) {
    const formData = new FormData();
    const [name, extension] = file.name.split('.');

    formData.append('file', file, `${options.filename || name}.${extension}`);

    if (options.folder) {
        formData.append('folder', options.folder);
    }

    return fetch('https://static.sayes.ru/upload.php', {
        method: 'POST',
        body: formData
    }).then(response => response.json());
}