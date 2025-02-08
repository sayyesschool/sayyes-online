export default ({
    models: { Lexeme, LexemeRecord }
}) => ({
    async search(q, execludeId) {
        const regex = q && new RegExp(q, 'i');
        const query = { value: regex, publishStatus: 'approved', _id: { $ne: execludeId } };

        return await Promise.all([
            Lexeme.countDocuments(query),
            Lexeme.find(query)
        ]);
    },

    async get(publishStatus) {
        return await Lexeme.find({ publishStatus }).sort({ createdAt: -1 });
    },

    async addLexeme(userId, { value, translation }) {
        return await Lexeme.create({
            value,
            translation,
            createdBy: userId
        });
    },

    async updateLexeme(lexemeId, { value, translation, definition, examples, image, additionalData }) {
        const lexeme = await Lexeme.findById(lexemeId);

        if (!lexeme) throw {
            code: 404,
            message: 'Не найдено'
        };

        const updateData = {
            value: value,
            image: image,
            definition: definition,
            translation: translation,
            examples: examples,
            publishStatus: 'approved'
        };

        const updatedLexeme = await Lexeme.findOneAndUpdate(
            {
                _id: lexemeId
            },
            updateData,
            { new: true }
        );

        if (!updatedLexeme) throw {
            code: 403,
            message: 'Данне нельзя обновить'
        };

        const record = await LexemeRecord.findOne({ lexemeId: lexeme.id });

        if (record) {
            const {
                translation: addTranslate,
                definition: addDefinition,
                examples: addExamples
            } = additionalData;

            if (addTranslate) {
                record.data.translation = lexeme.translation;
            }

            if (addDefinition) {
                record.data.definition = lexeme.definition;
            }

            if (addExamples.length) {
                record.data.examples = addExamples;
            }

            await record.save();
        }

        return updatedLexeme.toJSON();
    },

    async mergeLexemes({ newLexemeData, merge, deletedLexemeIds }) {
        const newLexeme = await Lexeme.create({ ...newLexemeData, publishStatus: 'approved' });

        await Lexeme.deleteMany({ _id: { $in:  deletedLexemeIds } });

        const lexemeRecords = await LexemeRecord.find({ lexemeId: { $in: deletedLexemeIds } });

        const recordsByUser = lexemeRecords.reduce((acc, record) => {
            const records = acc[record.learnerId];

            acc[record.learnerId] = records ? [...records, record] : [record];

            return acc;
        }, {});

        await Promise.all(Object.entries(recordsByUser).flatMap(([learnerId, lexemes]) => {
            const data = this.mergeRecordData(merge, lexemes);

            return Promise.all([
                LexemeRecord.deleteMany({ _id: { $in: lexemes.map(lexeme => lexeme.id) } }),
                LexemeRecord.create({ lexemeId: newLexeme.id, learnerId, data })
            ]);
        }));

        return newLexeme.toJSON();
    },

    mergeRecordData(mergeData, lexemes) {
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
    },

    async updatePublishStatus(lexemeId, publishStatus) {
        const lexeme = await Lexeme.findByIdAndUpdate(lexemeId, {
            publishStatus
        });

        if (!lexeme) throw {
            code: 404,
            message: 'Не найдено'
        };

        return lexeme;
    },

    async deleteLexeme(lexemeId) {
        const lexeme = await Lexeme.findByIdAndDelete(lexemeId);

        if (!lexeme) throw {
            code: 404,
            message: 'Не найдено'
        };

        return lexeme;
    }
});