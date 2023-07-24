const { basename, extname, join } = require('path/posix');
const { Router } = require('express');
const upload = require('multer')();
const { v4: uuidv4 } = require('uuid');

const router = Router();

module.exports = ({ services: { Storage } }) => {
    router.post('/', upload.single('file'), (req, res, next) => {
        if (!req.file) return next(new Error('No file'));
        if (!req.body.path) return next(new Error('No path'));

        const file = req.file;
        const path = getNormalizedPath(req.body.path, file);

        Storage.put(path, file.buffer)
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

    router.delete('/', (req, res, next) => {
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

function isFilename(path) {
    return basename(path).includes('.');
}

function getUniqueFilename(file) {
    return uuidv4() + extname(file.originalname);
}

function getNormalizedPath(path, file) {
    return isFilename(path) ? path : join(path, getUniqueFilename(file));
}