export default ({
    models: { Lexeme, LexemeRecord }
}) => ({
    async search(string = '', { batch = 1, limit = 0, exclude = [] } = { }) {
        const regex = new RegExp(string, 'i');
        const skip = (batch - 1) * limit;
        const query = {
            value: regex,
            publishStatus: 'approved'
        };

        if (exclude.length) {
            query._id = { $nin: exclude };
        }

        const [count, lexemes] = await Promise.all([
            Lexeme.countDocuments(query),
            Lexeme.find(query).skip(skip).limit(limit)
        ]);
        const more = skip + lexemes.length < count;

        return {
            results: lexemes,
            totalCount: count,
            count: lexemes.length,
            batch,
            more
        };
    },

    async find(query) {
        return Lexeme.find(query).sort({ createdAt: -1 });
    },

    async getLexeme(query) {
        const lexeme = await Lexeme.resolve(query);

        if (!lexeme) throw {
            code: 404,
            message: 'Лексема на найдена'
        };

        return lexeme;
    },

    async createLexeme(data, createdBy) {
        return Lexeme.create({ ...data, createdBy: data.createdBy || createdBy });
    },

    async updateLexeme(lexemeId, data = {}) {
        const lexeme = await Lexeme.update(lexemeId, data, { new: true });

        if (!lexeme) throw {
            code: 404,
            message: 'Лексема не найдена'
        };

        return lexeme;
    },

    async updatePublishStatus(lexemeId, publishStatus) {
        const lexeme = await Lexeme.update(lexemeId, {
            publishStatus
        }, { new: true });

        if (!lexeme) throw {
            code: 404,
            message: 'Лексема не найдена'
        };

        return lexeme;
    },

    async approveLexeme(lexemeId, lexemeData, recordData) {
        const lexeme = await this.getLexeme(lexemeId);

        if (lexeme.isApproved) throw {
            code: 400,
            message: 'Лексема уже одобрена'
        };

        const record = await LexemeRecord.findOne({
            learnerId: lexeme.createdBy,
            lexemeId: lexeme.id
        });

        if (record && recordData) {
            const {
                translation,
                definition,
                examples
            } = recordData;

            if (translation) {
                record.data.translation = lexeme.translation;
            }

            if (definition) {
                record.data.definition = lexeme.definition;
            }

            if (examples?.length) {
                record.data.examples = examples;
            }

            await record.save();
        }

        return this.updateLexeme(lexemeId, {
            ...lexemeData,
            publishStatus: 'approved'
        });
    },

    async mergeLexemes(lexemeIds, newLexemeData, oldLexemesDataById) {
        const lexeme = await Lexeme.create({
            ...newLexemeData,
            publishStatus: 'approved'
        });

        await Lexeme.deleteMany({
            _id: { $in:  lexemeIds }
        });

        const records = await LexemeRecord.find({
            lexemeId: { $in: lexemeIds }
        });

        const recordsByLearner = records.reduce((acc, record) => {
            const records = acc[record.learnerId];

            acc[record.learnerId] = records ? [...records, record] : [record];

            return acc;
        }, {});

        await Promise.all(Object.entries(recordsByLearner).flatMap(([learnerId, records]) => {
            const data = mergeRecordsDataWithLexemes(records, oldLexemesDataById);

            return Promise.all([
                LexemeRecord.deleteMany({
                    _id: { $in: records.map(r => r.id) }
                }),
                LexemeRecord.create({
                    lexemeId: lexeme.id,
                    learnerId,
                    data
                })
            ]);
        }));

        return lexeme;
    },

    async deleteLexeme(lexemeId) {
        const lexeme = await Lexeme.findByIdAndDelete(lexemeId);

        if (!lexeme) throw {
            code: 404,
            message: 'Лексема не найдена'
        };

        return lexeme;
    }
});

function mergeRecordsDataWithLexemes(records = [], data = {}) {
    const lexemeIds = records.map(r => r.lexemeId.toString());

    return Object.entries(data)
        .filter(([id]) => lexemeIds.includes(id))
        .reduce((acc, [, item]) => {
            Object.entries(item).forEach(([key, value]) => {
                acc[key] = acc[key] ?
                    Array.isArray(acc[key]) ?
                        acc[key].concat(value) :
                        `${acc[key]}, ${value}` :
                    value;
            });

            return acc;
        }, {});
}