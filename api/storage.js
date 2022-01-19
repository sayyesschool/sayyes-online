const { extname } = require('path');
const { Router } = require('express');
const upload = require('multer')();
const { v4: uuidv4 } = require('uuid');

const router = Router();

const validFolders = ['images'];

module.exports = ({ services: { Storage } }) => {
    router.param('folder', (req, res, next, folder) => {
        if (!validFolders.includes(folder)) {
            return next(new Error('Неверная директория'));
        }

        next();
    });

    router.post('/:folder', upload.single('file'), (req, res, next) => {
        const file = req.file;
        const filename = uuidv4() + extname(file.originalname); //file.originalname;
        const key = `${req.params.folder}/${filename}`;

        Storage.put(key, file.buffer)
            .then(response => {
                res.json({
                    ok: true,
                    data: {
                        url: response.url
                    }
                });
            })
            .catch(next);
    });

    router.delete('/:folder/:key', (req, res, next) => {
        Storage.delete(`${req.params.folder}/${req.params.key}`)
            .then(() => {
                res.json({
                    ok: true,
                    filename: req.params.key
                });
            })
            .catch(next);
    });

    return router;
};