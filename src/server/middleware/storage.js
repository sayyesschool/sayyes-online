const upload = require('multer')();

module.exports = ({ services: { Storage } }) => ({
    upload: [
        upload.single('image'),
        (req, res, next) => {
            if (!req.file) return next();

            Storage.upload(req.file, {
                name: req.body.image,
                path: `courses/${req.params.course}/images/`
            }).then(data => {
                req.body.image = data.name;
            }).finally(() => next());
        }
    ],

    delete: (req, res, next) => {
        if (req.body.imageUrl) return next();

        Storage.delete(req.body.imageUrl)
            .finally(() => next());
    }
});