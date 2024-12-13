export default ({
    models: { Lexeme, LexemeRecord }
}) => ({
    async get(req, res, next) {
        const lexemes = await Lexeme.find();

        res.json({
            ok: true,
            data: {
                id: 'global',
                title: 'Глобальный словарь',
                lexemes,
                lexemeIds: lexemes.map(lexeme => lexeme.id),
                numberOfLexemes: lexemes.length,
                learnerId: req.user.id
            }
        });
    },

    async addLexeme(req, res) {
        let lexeme = await (req.body.lexemeId ?
            Lexeme.findById(req.body.lexemeId) :
            Lexeme.findOne({
                value: req.body.value,
                translation: req.body.translation
            }));

        if (!lexeme) {
            lexeme = await Lexeme.create({
                value: req.body.value,
                translation: req.body.translation,
                definition: req.body.definition,
                createdBy: req.user.id
            });
        }

        let record = await LexemeRecord.findOne({
            lexemeId: lexeme.id,
            learnerId: req.body.learnerId || req.user.id
        });

        if (lexeme && !record) {
            record = await LexemeRecord.create({
                lexemeId: lexeme.id,
                learnerId: req.body.learnerId || req.user.id
            });
        }

        const data = lexeme.toJSON();

        data.status = record.status;
        data.reviewDate = record.reviewDate;

        if (req.params.vocabularyId) {
            await req.vocabulary.addLexeme(lexeme.id);
            data.vocabularyId = req.vocabulary.id;
        }

        res.json({
            ok: true,
            data
        });
    },

    async updateLexemeStatus(req, res) {
        const lexeme = await Lexeme.findOneAndUpdate({
            _id: req.params.lexemeId
        }, {
            approved: req.body.status
        });

        console.log(999, req.params, lexeme);

        if (!lexeme) throw {
            code: 404,
            message: 'Не найдено'
        };

        res.json({
            ok: true,
            data: {
                id: lexeme.lexemeId,
                data: lexeme
            }
        });
    }
});