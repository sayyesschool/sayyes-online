export default ({
    models: { Vocabulary }
}) => ({
    async findOne(req, res, next, id) {
        const vocabulary = await Vocabulary.findById(id);

        if (!vocabulary) throw {
            code: 404,
            message: 'Словарь не найден'
        };

        req.vocabulary = vocabulary;

        next();
    }
});