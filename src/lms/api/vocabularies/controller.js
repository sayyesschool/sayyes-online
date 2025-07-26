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

        data.id = req.query.learnerId ? 'learner' : 'my';
        data.title = req.query.learnerId ? 'Словарь ученика' : 'Мой словарь';
        data.url = req.query.learnerId ? undefined : '/vocabularies/my';

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

    // TODO: Move to Lexicon
    async getLexemes(req, res) {
        const lexemes = await Vocabulary.getLexemes(
            req.query.ids?.split(','),
            req.user.id
        );

        res.json({
            ok: true,
            data: lexemes
        });
    },

    // TODO: Move to Lexicon
    async addLexemes(req, res) {
        const lexemes = await Vocabulary.addLexemes(
            req.body.lexemeIds,
            req.body.learnerId
        );

        res.json({
            ok: true,
            message: 'Успешно добавлены',
            data: lexemes
        });
    },

    async addLexeme(req, res) {
        const lexeme = await Vocabulary.addLexeme(
            req.body.data,
            req.body.learnerId,
            req.vocabulary
        );

        res.json({
            ok: true,
            message: 'Успешно добавлено',
            data: lexeme
        });
    },

    async updateLexeme(req, res) {
        const lexeme = await Vocabulary.updateLexeme(
            req.params.lexemeId,
            req.body.data,
            req.body.learnerId
        );

        res.json({
            ok: true,
            message: 'Успешно обновлено',
            data: lexeme
        });
    },

    // TODO: Move to Lexicon
    async updateLexemeStatus(req, res) {
        const record = await Vocabulary.updateLexemeStatus(
            req.params.lexemeId,
            req.body.learnerId,
            req.body.status
        );

        res.json({
            ok: true,
            data: {
                id: record.lexemeId,
                data: record.data,
                status: record.status,
                reviewDate: record.reviewDate
            }
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

    // TODO: Move to Lexicon
    async deleteLexeme(req, res) {
        const lexeme = await Vocabulary.deleteLexeme(
            req.params.lexemeId,
            req.body.learnerId
        );

        res.json({
            ok: true,
            message: 'Успешно удалено',
            data: lexeme
        });
    }
});