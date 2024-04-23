export default ({
    models: { Lexeme, LexiconRecord, Vocabulary }
}) => ({
    async getMany(req, res) {
        const vocabularies = await Vocabulary.find({
            learnerId: req.user.id
        });

        res.json({
            ok: true,
            data: vocabularies
        });
    },

    async getOne(req, res) {
        const vocabulary = await Vocabulary.findById(req.params.id).populate({
            path: 'lexemes',
            populate: {
                path: 'data'
            }
        });

        if (!vocabulary) throw {
            code: 404,
            message: 'Словарь не найден'
        };

        res.json({
            ok: true,
            data: vocabulary
        });
    },

    async create(req, res) {
        const vocabulary = await Vocabulary.create({
            title: req.body.title,
            learnerId: req.user.id,
            description: req.body.description,
            image: req.body.image
        });

        res.json({
            ok: true,
            data: vocabulary
        });
    },

    async update(req, res) {
        const vocabulary = await Vocabulary.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image
        }, {
            new: true
        });

        res.json({
            ok: true,
            data: vocabulary
        });
    },

    async delete(req, res) {
        const vocabulary = await Vocabulary.findByIdAndDelete(req.params.id);

        res.json({
            ok: true,
            data: {
                id: vocabulary.id
            }
        });
    },

    async addLexeme(req, res) {
        // TODO: move vocabulary to middleware
        const vocabulary = await Vocabulary.findById(req.params.vocabularyId);

        const lexeme = await Lexeme.create({
            value: req.body.value,
            translations: [{ text: req.body.translation }],
            createdBy: req.user.id
        });

        await LexiconRecord.create({
            lexemeId: lexeme.id,
            learnerId: req.user.id
        });

        vocabulary.lexemeIds.push(lexeme.id);

        await vocabulary.save();

        const data = lexeme.toJSON();

        data.vocabularyId = req.params.vocabularyId;

        res.json({
            ok: true,
            data
        });
    },

    async updateLexeme(req, res) {
        const lexeme = await Lexeme.findById(req.params.lexemeId);

        if (lexeme?.createdBy?.toString() !== req.user.id) throw {
            code: 403,
            message: 'Это слово нельзя изменить'
        };

        lexeme.translations = [{ text: req.body.translation }];

        await lexeme.save();

        const data = lexeme.toJSON();

        data.vocabularyId = req.params.vocabularyId;

        res.json({
            ok: true,
            data
        });
    },

    async removeLexeme(req, res) {
        // TODO: move vocabulary to middleware
        const vocabulary = await Vocabulary.findById(req.params.vocabularyId).populate('lexemes');
        const lexemeToRemove = vocabulary.lexemes.find(lexeme => lexeme.id === req.params.lexemeId);

        if (lexemeToRemove?.createdBy?.toString() !== req.user.id) throw {
            code: 403,
            message: 'Это слово нельзя удалить'
        };

        vocabulary.lexemeIds.filter(lexemeId => lexemeId !== req.params.lexemeId);

        await vocabulary.save();

        res.json({
            ok: true,
            data: {
                id: req.params.lexemeId,
                vocabularyId: req.params.vocabularyId
            }
        });
    }
});