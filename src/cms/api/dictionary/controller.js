export default ({
    services: { Dictionary }
}) => ({
    async search(req, res) {
        const { b, e, limit, ...query } = req.query;
        const { results, totalCount, batch, more } = await Dictionary.search(query, {
            batch: b,
            exclude: e,
            limit
        });

        res.json({
            ok: true,
            data: results,
            meta: {
                totalCount,
                batch,
                more
            }
        });
    },

    async match(req, res) {
        const lexemes = await Dictionary.find({
            _id: { $nin: req.query.e },
            value: req.query.q
        });

        res.json({
            ok: true,
            data: lexemes
        });
    },

    async get(req, res) {
        const lexemes = await Dictionary.find(req.query);

        res.json({
            ok: true,
            data: {
                id: 'dictionary',
                title: 'Глобальный словарь',
                lexemes,
                lexemeIds: lexemes.map(lexeme => lexeme.id),
                numberOfLexemes: lexemes.length,
                publishStatus: req.query.publishStatus
            }
        });
    },

    async getLexemes(req, res) {
        const data = await Dictionary.getLexemes(req.query.ids?.split(','));

        res.json({
            ok: true,
            data
        });
    },

    async createLexeme(req, res) {
        const lexeme = await Dictionary.createLexeme(req.body, req.user.id);

        res.json({
            ok: true,
            message: 'Лексема создана',
            data: lexeme
        });
    },

    async updateLexeme(req, res) {
        const lexeme = await Dictionary.updateLexeme(req.params.lexemeId, req.body);

        res.json({
            ok: true,
            message: 'Лексема обновлена',
            data: lexeme
        });
    },

    async updatePublishStatus(req, res) {
        const lexeme = await Dictionary.updatePublishStatus(
            req.params.lexemeId,
            req.body.status
        );

        res.json({
            ok: true,
            message: 'Статус публикации лексемы обновлён',
            data: lexeme
        });
    },

    async approveLexeme(req, res) {
        const lexeme = await Dictionary.approveLexeme(
            req.params.lexemeId,
            req.body.lexemeData,
            req.body.recordData
        );

        res.json({
            ok: true,
            message: 'Лексема одобрена',
            data: lexeme
        });
    },

    async mergeLexemes(req, res) {
        const newLexeme = await Dictionary.mergeLexemes(
            req.body.lexemeIds,
            req.body.newLexemeData,
            req.body.oldLexemesDataById
        );

        res.json({
            ok: true,
            message: 'Лексемы объединены',
            data: {
                mergedLexemeIds: req.body.lexemeIds,
                newLexeme
            }
        });
    },

    async deleteLexeme(req, res) {
        const lexeme = await Dictionary.deleteLexeme(req.params.lexemeId);

        res.json({
            ok: true,
            message: 'Лексема удалена',
            data: lexeme
        });
    }
});