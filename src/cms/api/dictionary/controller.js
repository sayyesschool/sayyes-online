export default ({
    services: { Dictionary }
}) => ({
    async search(req, res) {
        const [count, lexemes] = await Dictionary.search(req.query.q, req.query.e);

        res.json({
            ok: true,
            meta: {
                totalCount: count
            },
            data: lexemes
        });
    },

    async get(req, res) {
        const lexemes = await Dictionary.get(req.query.publishStatus);

        res.json({
            ok: true,
            data: {
                id: 'dictionary',
                title: 'Глобальный словарь',
                lexemes,
                lexemeIds: lexemes.map(lexeme => lexeme.id),
                numberOfLexemes: lexemes.length,
                learnerId: req.user.id,
                publishStatus: req.query.publishStatus
            }
        });
    },

    async getLexemes(req, res) {
        let lexemeIds = req.query.lexemeIds;

        if (!Array.isArray(lexemeIds)) {
            lexemeIds = lexemeIds ? [lexemeIds] : [];
        }

        const data = await Dictionary.getLexemes(lexemeIds);

        res.json({
            ok: true,
            data
        });
    },

    async addLexeme(req, res) {
        const lexeme = await Dictionary.addLexeme(req.user.id, req.body);

        const data = lexeme.toJSON();

        res.json({
            ok: true,
            data
        });
    },

    async updateLexeme(req, res) {
        const data = await Dictionary.updateLexeme(req.params.lexemeId, req.body);

        res.json({
            ok: true,
            data
        });
    },

    async mergeLexemes(req, res) {
        const newLexeme = await Dictionary.mergeLexemes(req.body);

        res.json({
            ok: true,
            data: {
                deletedLexemeIds: req.body.deletedLexemeIds,
                newLexeme
            }
        });
    },

    async updatePublishStatus(req, res) {
        const lexeme = await Dictionary.updatePublishStatus(req.params.lexemeId, req.body.status);

        res.json({
            ok: true,
            data: lexeme
        });
    },

    async deleteLexeme(req, res) {
        const lexeme = await Dictionary.deleteLexeme(req.params.lexemeId);

        res.json({
            ok: true,
            data: lexeme
        });
    }
});