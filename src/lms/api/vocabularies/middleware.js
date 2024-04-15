export default ({
    models: { Vocabulary }
}) => ({
    async fineOne(req, res, next) {
        const vocabulary = await Vocabulary.findOneById(req.params.id);

        if (!vocabulary) throw {
            code: 404,
            message: 'Словарь не найден'
        };

        req.vocabulary = vocabulary;
    }
});