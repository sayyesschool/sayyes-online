export default ({
    models: { Lexeme, LexemeRecord }
}) => ({
    async get(req, res, next) {
        const lexemes = await Lexeme.find({ publishStatus: req.query.publishStatus });

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

    async addLexeme(req, res) {
        const lexeme = await Lexeme.create({
            value: req.body.value,
            translation: req.body.translation,
            createdBy: req.user.id
        });

        const data = lexeme.toJSON();

        res.json({
            ok: true,
            data
        });
    },

    async updateLexeme(req, res) {
        const lexeme = await Lexeme.findById(req.params.lexemeId);

        if (!lexeme) throw {
            code: 404,
            message: 'Не найдено'
        };

        const updateData = {
            value: req.body.value,
            image: req.body.image,
            definition: req.body.definition,
            translation: req.body.translation,
            examples: req.body.examples,
            publishStatus: 'approved'
        };

        const updatedLexeme = await Lexeme.findOneAndUpdate(
            {
                _id: req.params.lexemeId
            },
            updateData,
            { new: true }
        );

        if (!updatedLexeme) throw {
            code: 403,
            message: 'Данне нельзя обновить'
        };

        const data = updatedLexeme.toJSON();

        if (req.params.vocabulary) {
            data.vocabularyId = req.vocabulary.id;
        }

        res.json({
            ok: true,
            data: updatedLexeme
        });
    },
    //     const lexeme = await Lexeme.findById(req.params.lexemeId);

    //     if (!lexeme) throw {
    //         code: 404,
    //         message: 'Не найдено'
    //     };

    //     const record = await LexemeRecord.findOne({ learnerId: lexeme.createdBy });

    //     if (req.params.vocabulary) {
    //         data.vocabularyId = req.vocabulary.id;
    //     }

    //     res.json({
    //         ok: true,
    //         data: updatedLexeme
    //     });
    // },

    async updatePublishStatus(req, res) {
        const lexeme = await Lexeme.findByIdAndUpdate(req.params.lexemeId, {
            publishStatus: req.body.status
        });

        if (!lexeme) throw {
            code: 404,
            message: 'Не найдено'
        };

        res.json({
            ok: true,
            data: {
                id: lexeme.id
            }
        });
    },

    async deleteLexeme(req, res) {
        const lexeme = await Lexeme.findByIdAndDelete(req.params.lexemeId);

        if (!lexeme) throw {
            code: 404,
            message: 'Не найдено'
        };

        res.json({
            ok: true,
            data: {
                id: lexeme.id
            }
        });
    }
});