function upload(file, options = {}) {
    const formData = new FormData();
    const [name, extension] = file.name.split('.');

    formData.append('file', file, `${filename || name}.${extension}`);

    if (options.path) {
        formData.append('folder', options.path);
    }

    return fetch('https://static.sayyesonline.ru/upload.php', {
        method: 'POST',
        body: formData
    }).then(response => response.json());
}