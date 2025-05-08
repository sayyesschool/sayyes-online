export default ({
    services: { Vocabulary }
}) => ({
    async search(req, res) {
        const { lexemes, meta } = await Vocabulary.search(req.query);

        res.json({
            ok: true,
            data: lexemes,
            meta
        });
    },

    async getMany(req, res) {
        const vocabularies = await Vocabulary.getMany(req.user.id);

        res.json({
            ok: true,
            data: vocabularies
        });
    },

    async getOne(req, res) {
        const data = await Vocabulary.getOne(req.vocabulary);

        res.json({
            ok: true,
            data
        });
    },

    async getVirtual(req, res) {
        const vocabulary = await Vocabulary.getVirtual(
            req.query.learnerId || req.user.id
        );

        const data = vocabulary.toJSON();

        data.id = 'my';
        data.title = 'Мой словарь';
        data.url = '/vocabularies/my';

        res.json({
            ok: true,
            data
        });
    },

    async create(req, res) {
        const vocabulary = await Vocabulary.create(req.user.id, req.body);

        res.json({
            ok: true,
            data: vocabulary
        });
    },

    async update(req, res) {
        const vocabulary = await Vocabulary.update(req.params.vocabularyId, req.body);

        res.json({
            ok: true,
            data: vocabulary
        });
    },

    async delete(req, res) {
        const vocabulary = await Vocabulary.delete(req.params.vocabularyId);

        res.json({
            ok: true,
            data: {
                id: vocabulary.id
            }
        });
    },

    async addLexeme(req, res) {
        const lexeme = await Vocabulary.addLexeme(
            req.vocabulary,
            req.body.data,
            req.body.learnerId
        );

        const data = lexeme.toJSON();

        data.status = lexeme.record.status;
        data.reviewDate = lexeme.record.reviewDate;
        data.vocabularyId = req.vocabulary?.id;
        delete data.record;

        res.json({
            ok: true,
            message: 'Успешно добавлено',
            data
        });
    },

    async updateLexeme(req, res) {
        const lexeme = await Vocabulary.updateLexeme(
            req.params.lexemeId,
            req.body.data,
            req.body.learnerId
        );

        const data = lexeme.toJSON();

        data.status = lexeme.record?.status;
        data.reviewDate = lexeme.record?.reviewDate;
        delete data.record;

        res.json({
            ok: true,
            message: 'Успешно обновлено',
            data
        });
    },

    async removeLexeme(req, res) {
        await Vocabulary.removeLexeme(req.vocabulary, req.params.lexemeId);

        res.json({
            ok: true,
            message: 'Успешно удалено',
            data: {
                id: req.params.lexemeId,
                vocabularyId: req.params.vocabularyId
            }
        });
    },

    async deleteLexeme(req, res) {
        const record = await Vocabulary.deleteLexeme(req.params.lexemeId, req.user.id);

        res.json({
            ok: true,
            message: 'Успешно удалено',
            data: {
                id: record.lexemeId
            }
        });
    },

    async updateLexemeStatus(req, res) {
        const record = await Vocabulary.updateLexemeStatus(req.params.lexemeId, req.user.id, req.body.status);

        res.json({
            ok: true,
            data: {
                id: record.lexemeId,
                data: record.data,
                status: record.status,
                reviewDate: record.reviewDate
            }
        });
    }
});