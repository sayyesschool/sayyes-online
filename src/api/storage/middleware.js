import multer from 'multer';

const upload = multer();

export default () => ({
    file: upload.single('file')
});