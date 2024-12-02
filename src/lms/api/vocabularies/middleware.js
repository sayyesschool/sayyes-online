import { isObjectIdOrHexString } from 'mongoose';

export default ({
    models: { Vocabulary }
}) => ({
    async findOne(req, res, next, id) {
        if (!isObjectIdOrHexString(id)) return next({
            code: 400,
            message: 'Неверный идентификатор словаря'
        });

        const vocabulary = await Vocabulary.findById(id);

        if (!vocabulary) next({
            code: 404,
            message: 'Словарь не найден'
        });

        req.vocabulary = vocabulary;

        next();
    }
});