export default ({
    models: { Lexeme, LexemeRecord }
}) => ({
    async get(req, res) {
        //TODO: правильно ли я тут использую сортировку
        const lexemes = await Lexeme.find({ publishStatus: req.query.publishStatus }).sort({ createdAt: -1 });;

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

    // TODO: как бы разрулть тут всё без дублирования
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

        const record = await LexemeRecord.findOne({ lexemeId: lexeme.id });

        const addTranslate = req.body.checkboxes.translation;
        const addDefinition = req.body.checkboxes.definition;
        const examples = req.body.checkboxes.examples;

        if (addTranslate) {
            record.data.translation = lexeme.translation;
        }

        if (addDefinition) {
            record.data.definition = lexeme.definition;
        }

        if (examples.length) {
            record.data.examples = lexeme.examples.filter(example => examples.includes(example.id));
        }

        await record.save();

        const data = updatedLexeme.toJSON();

        if (req.params.vocabulary) {
            data.vocabularyId = req.vocabulary.id;
        }

        res.json({
            ok: true,
            data: updatedLexeme
        });
    },

    async updateLexemes(req, res) {
        // TODO: отрефакторить, убрать два запроса за лексимой
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
            examples: req.body.examples
            // publishStatus: 'approved'
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

        console.log(999, newRecord.data);

        const record = await LexemeRecord.findOne({ lexemeId: lexeme.id });
        const addTranslate = req.body.checkboxes.translation;
        const addDefinition = req.body.checkboxes.definition;

        if (addTranslate) {
            record.data.translation = lexeme.translation;
        }

        if (addDefinition) {
            record.data.definition = lexeme.definition;
        }

        const newRecord = await record.save();

        console.log(999, newRecord.data);

        const data = updatedLexeme.toJSON();

        if (req.params.vocabulary) {
            data.vocabularyId = req.vocabulary.id;
        }

        res.json({
            ok: true,
            data: updatedLexeme
        });
    },

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
            data: { id: lexeme.id }
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
            data: { id: lexeme.id }
        });
    }
});