import { isObjectIdOrHexString } from 'mongoose';

export default ({
    models: { Vocabulary }
}) => ({
    async findOne(req, res, next, id) {
        if (!isObjectIdOrHexString(id)) next({
            code: 400,
            message: 'Неверный идентификатор'
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