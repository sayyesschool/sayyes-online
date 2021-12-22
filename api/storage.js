const { Router } = require('express');
const upload = require('multer')();

const router = Router();

module.exports = ({ services: { Storage } }) => {
    router.post('/put', upload.single('file'), (req, res, next) => {
        const file = req.file;
        const filename = `${req.user.id}_${file.originalname}`;
        const key = req.body.path ? (req.body.path + filename) : filename;

        Storage.put(key, file.buffer)
            .then(response => {
                res.json({
                    ok: true,
                    data: {
                        url: response.url
                    }
                });
            });
    });

    return router;
};