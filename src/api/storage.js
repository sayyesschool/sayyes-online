const { basename, extname, dirname } = require('path');
const { Router } = require('express');
const upload = require('multer')();
const { v4: uuidv4 } = require('uuid');

const router = Router();

const validFolders = ['images'];

function isFilename(path) {
    return basename(path).includes('.');
}

function getUniqueFilename(file) {
    return uuidv4() + extname(file.originalname);
}

module.exports = ({ services: { Storage } }) => {
    router.param('folder', (req, res, next, folder) => {
        if (!validFolders.includes(folder)) {
            return next(new Error('Неверная директория'));
        }

        next();
    });

    router.post('/*', upload.single('file'), (req, res, next) => {
        const file = req.file;

        const path = (isFilename(req.path) ? dirname(req.path) : req.path).slice(1);
        const filename = isFilename(req.path) ? basename(req.path) : getUniqueFilename(file);
        const key = path.endsWith('/') ?
            `${path}${filename}` :
            `${path}/${filename}`;

        Storage.put(key, file.buffer)
            .then(response => {
                res.json({
                    ok: true,
                    data: {
                        url: response.url,
                        path: response.path
                    }
                });
            })
            .catch(next);
    });

    router.delete('/*', (req, res, next) => {
        const key = req.path.slice(1);

        Storage.delete(key)
            .then(response => {
                res.json({
                    ok: true,
                    data: {
                        url: response.url,
                        path: response.path
                    }
                });
            })
            .catch(next);
    });

    return router;
};