export default ({
    models: { Lexeme, LexemeRecord }
}) => ({
    async get(req, res) {
        const lexemes = await Lexeme.find({ publishStatus: req.query.publishStatus }).sort({ createdAt: -1 });

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

        const record = await LexemeRecord.findOne({ lexemeId: lexeme.id });

        const addTranslate = req.body.additionalData.translation;
        const addDefinition = req.body.additionalData.definition;
        const examples = req.body.additionalData.examples;

        if (addTranslate) {
            record.data.translation = lexeme.translation;
        }

        if (addDefinition) {
            record.data.definition = lexeme.definition;
        }

        if (examples.length) {
            record.data.examples = examples;
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

    async mergeLexemes(req, res) {
        function mergeRecordData(mergeData, lexemes) {
            const lexemIds = lexemes.map(lexeme => lexeme.lexemeId.toString());

            const filteredEntries = Object.entries(mergeData).filter(([id]) => lexemIds.includes(id));

            return filteredEntries.reduce((acc, [, item]) => {
                Object.entries(item).forEach(([key, value]) => {
                    acc[key] = acc[key] ?
                        Array.isArray(acc[key]) ?
                            acc[key].concat(value) :
                            `${acc[key]}  ${value}` :
                        value;
                });

                return acc;
            }, {});
        }

        const newLexeme = await Lexeme.create({ ...req.body.new, publishStatus: 'approved' });

        await Lexeme.deleteMany({ _id: { $in:  req.body.deletedLexemeIds } });

        const lexemeRecords = await LexemeRecord.find({ lexemeId: { $in: req.body.deletedLexemeIds } });

        const recordsByUser = lexemeRecords.reduce((acc, record) => {
            const records = acc[record.learnerId];

            acc[record.learnerId] = records ? [...records, record] : [record];

            return acc;
        }, {});

        await Promise.all(Object.entries(recordsByUser).flatMap(([learnerId, lexemes]) => {
            const data = mergeRecordData(req.body.merge, lexemes);

            return Promise.all([
                LexemeRecord.deleteMany({ _id: { $in: lexemes.map(lexeme => lexeme.id) } }),
                LexemeRecord.create({ lexemeId: newLexeme.id, learnerId, data })
            ]);
        }));

        res.json({
            ok: true,
            data: {
                deletedLexemeIds: req.body.deletedLexemeIds,
                newLexeme
            }
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