import axios from 'axios';
import FormData from 'form-data';
import { nanoid } from 'nanoid';
import { stringify } from 'querystring';

function uploadFile(file, { name = nanoid(16), path } = {}) {
    const data = new FormData();
    const [_name, extension] = file.originalname.split('.');
    const filename = `${name || _name}.${extension}`;

    data.append('file', file.buffer, {
        filename,
        contentType: file.mimetype,
        knownLength: file.size
    });
    data.append('path', path);

    return axios.post('https://static.sayes.ru/upload-image.php', data, {
        headers: data.getHeaders()
    }).then(res => res.data);
}

function deleteFile(path) {
    const data = stringify({ path });

    return axios.post('https://static.sayes.ru/delete.php', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.data);
}

export default () => {
    return {
        uploadFile,
        deleteFile,
        upload: uploadFile,
        delete: deleteFile
    };
};