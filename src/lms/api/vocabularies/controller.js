export default ({
    services: { Vocabulary: VocabularyService }
}) => ({
    async search(req, res) {
        const { lexemes, meta } = await VocabularyService.search(req.query);

        res.json({
            ok: true,
            meta,
            data: lexemes
        });
    },

    async getMany(req, res) {
        const vocabularies = await VocabularyService.getMany(req.user.id);

        res.json({
            ok: true,
            data: vocabularies
        });
    },

    async getMy(req, res) {
        const lexemes = await VocabularyService.getMy(req.query.learnerId, req.user.id);

        res.json({
            ok: true,
            data: {
                id: 'my',
                title: 'Мой словарь',
                lexemes,
                lexemeIds: lexemes.map(lexeme => lexeme.id),
                numberOfLexemes: lexemes.length,
                learnerId: req.user.id
            }
        });
    },

    async getOne(req, res) {
        const data = await VocabularyService.getOne(req.vocabulary);

        res.json({
            ok: true,
            data
        });
    },

    async create(req, res) {
        const vocabulary = await VocabularyService.create(req.user.id, req.body);

        res.json({
            ok: true,
            data: vocabulary
        });
    },

    async update(req, res) {
        const vocabulary = await VocabularyService.update(req.params.vocabularyId, req.body);

        res.json({
            ok: true,
            data: vocabulary
        });
    },

    async delete(req, res) {
        const vocabulary = await VocabularyService.delete(req.params.vocabularyId);

        res.json({
            ok: true,
            data: {
                id: vocabulary.id
            }
        });
    },

    async getLexemes(req, res) {
        const data = await VocabularyService.getLexemes(req.user.id, req.body.lexemeIds);

        res.json({
            ok: true,
            data
        });
    },

    async addLexeme(req, res) {
        const data = await VocabularyService.addLexeme(req.user.id, req.params.vocabularyId, req.vocabulary, req.body);

        res.json({
            ok: true,
            data
        });
    },

    async updateLexeme(req, res) {
        const data = await VocabularyService.updateLexeme(req.user.id, req.vocabulary?.id, req.params, req.body);

        res.json({
            ok: true,
            data: VocabularyService.transformLexeme(data)
        });
    },

    async removeLexeme(req, res) {
        await VocabularyService.removeLexeme(req.vocabulary, req.params.lexemeId);

        res.json({
            ok: true,
            data: {
                id: req.params.lexemeId,
                vocabularyId: req.params.vocabularyId
            }
        });
    },

    async deleteLexeme(req, res) {
        const lexeme = await VocabularyService.deleteLexeme(req.params.lexemeId, req.user.id);

        res.json({
            ok: true,
            data: lexeme
        });
    },

    async updateLexemeStatus(req, res) {
        const record = await VocabularyService.updateLexemeStatus(req.params.lexemeId, req.user.id, req.body.status);

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