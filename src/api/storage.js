import { basename, extname, join } from 'node:path/posix';

import { Router } from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';

export default ({ config: { STORAGE_URL }, services: { Storage } }) => {
    const router = Router();
    const upload = multer();

    router.post('/', upload.single('file'), async (req, res) => {
        if (!req.file) throw new Error('No file');
        if (!req.body.path) throw new Error('No path');

        const file = req.file;
        const path = getNormalizedPath(STORAGE_URL, req.body.path, file);

        const response = await Storage.put(path, file.buffer);

        res.json({
            ok: true,
            data: {
                url: response.url,
                path: response.path
            }
        });
    });

    router.delete('/', async (req, res) => {
        if (!req.body.path) throw new Error('No path');

        const path = getNormalizedPath(STORAGE_URL, req.body.path, {});
        const response = await Storage.delete(path);

        res.json({
            ok: true,
            data: {
                url: response.url,
                path: response.path
            }
        });
    });

    return router;
};

function isFilename(path) {
    return basename(path).includes('.');
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

function getUniqueFilename(file) {
    return uuid() + extname(file.originalname);
}

function getNormalizedPath(basePath, path, file) {
    if (path.includes(basePath)) {
        path = new URL(path).pathname.split('/').slice(2).join('/');
    }

    return isFilename(path) ? path : join(path, getUniqueFilename(file));
}