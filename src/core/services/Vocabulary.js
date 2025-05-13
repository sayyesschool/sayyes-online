export default ({
    models: { Lexeme, LexemeRecord, Vocabulary }
}) => ({
    async search({ q, p, c }) {
        const regex = q && new RegExp(q, 'i');
        const batch = Number(p ?? 1);
        const limit = Number(c ?? 0);
        const skip = (batch - 1) * limit;
        const query = {
            value: regex,
            publishStatus: 'approved'
        };

        const [count, lexemes] = await Promise.all([
            Lexeme.countDocuments(query),
            Lexeme.find(query).skip(skip).limit(limit)
        ]);
        const more = skip + lexemes.length < count;

        return {
            lexemes,
            meta: {
                totalCount: count,
                count: lexemes.length,
                batch,
                more
            }
        };
    },

    async getMany(learnerId) {
        return Vocabulary.find({
            $or: [{ learnerId }, { learnerId: { $exists: false } }]
        });
    },

    // TODO: переписать на populate
    async getLexemes(learnerId, lexemeIds) {
        const lexemes = await Lexeme.find({ _id: { $in: lexemeIds } });

        return Promise.all(
            lexemes.map(async lexeme => {
                const record = await LexemeRecord.findOne({
                    lexemeId: lexeme._id,
                    learnerId
                });

                return {
                    ...lexeme.toJSON(),
                    ...this.transformRecord(record)
                };
            })
        );
    },

    async addLexemes(learnerId, newLexemeIds) {
        const lexemes = await Lexeme.find({ _id: { $in: newLexemeIds } });

        const result = await Promise.all(
            lexemes.map(async lexeme => {
                const record = await LexemeRecord.create({
                    lexemeId: lexeme._id,
                    learnerId
                });

                return {
                    ...lexeme.toJSON(),
                    ...this.transformRecord(record)
                };
            })
        );

        return result;
    },

    async getVirtual(learnerId) {
        const records = await LexemeRecord.find({
            learnerId
        })
            .populate('lexeme')
            .sort({ createdAt: -1 });

        const lexemes = records
            .filter(r => r.lexeme) // filter out deleted lexemes. This is actually a problem, because a record should NOT exist without a lexeme
            .map(r => ({
                ...r.lexeme.toJSON(),
                status: r.status,
                reviewDate: r.reviewDate,
                data: r.data
            }));

        const vocabulary = new Vocabulary({
            learnerId,
            lexemeIds: lexemes.map(lexeme => lexeme.id)
        });

        vocabulary.lexemes = lexemes;

        return vocabulary;
    },

    async getOne(reqVocabulary) {
        const vocabulary = await reqVocabulary.populate({
            path: 'lexemes',
            populate: {
                path: 'record',
                transform: this.transformRecord
            }
        });

        const data = vocabulary.toJSON();

        data.lexemes = data.lexemes.map(lexeme => ({
            ...lexeme,
            status: 0,
            ...lexeme.record,
            record: undefined
        }));

        return data;
    },

    async create(userId, { title, description, image }) {
        const vocabulary = await Vocabulary.create({
            title: title,
            learnerId: userId,
            description: description,
            image: image
        });

        return vocabulary;
    },

    async update(vocabularyId, { title, description, image }) {
        const vocabulary = await Vocabulary.findByIdAndUpdate(
            vocabularyId,
            {
                title: title,
                description: description,
                image: image
            },
            {
                new: true
                // select: Object.keys(req.body).join(' ')
            }
        );

        return vocabulary;
    },

    async delete(vocabularyId) {
        const vocabulary = await Vocabulary.findByIdAndDelete(vocabularyId);

        return vocabulary;
    },

    async addLexeme(
        vocabulary,
        data,
        learnerId
    ) {
        const { id, value, translation, definition } = data;

        let lexeme = await (id
            ? Lexeme.findById(id)
            : Lexeme.findOne({
                value,
                translation,
                publishStatus: 'approved'
            }));

        if (!lexeme) {
            lexeme = await Lexeme.create({
                value,
                translation,
                definition,
                createdBy: learnerId
            });
        }

        let record = await LexemeRecord.findOne({
            lexemeId: lexeme.id,
            learnerId
        });

        if (lexeme && !record) {
            record = await LexemeRecord.create({
                lexemeId: lexeme.id,
                learnerId
            });
        }

        if (vocabulary) {
            await vocabulary.addLexeme(lexeme.id);
        }

        lexeme.record = record;

        return lexeme;
    },

    async updateLexeme(
        lexemeId,
        data,
        learnerId
    ) {
        const lexeme = await Lexeme.findById(lexemeId);

        if (!lexeme) throw {
            code: 404,
            message: 'Лексема на найдена'
        };

        const updatedLexeme = !lexeme.isApproved
            ? await Lexeme.findOneAndUpdate(
                {
                    _id: lexemeId,
                    createdBy: lexeme.createdBy
                },
                data,
                { new: true }
            ).populate({
                path: 'record',
                match: { learnerId },
                transform: transformRecord
            })
            : await LexemeRecord.findOneAndUpdate(
                {
                    lexemeId,
                    learnerId
                },
                {
                    data
                },
                {
                    new: true,
                    upsert: true
                }
            ).populate({
                path: 'lexeme'
            }).then(record => {
                const lexeme = record.lexeme;

                lexeme.record = transformRecord(record);

                return lexeme;
            });

        if (!updatedLexeme) throw {
            code: 403,
            message: 'Данные нельзя обновить'
        };

        return updatedLexeme;
    },

    async removeLexeme(vocabulary, lexemeId) {
        return vocabulary.removeLexeme(lexemeId);
    },

    async deleteLexeme(lexemeId, learnerId) {
        const record = await LexemeRecord.findOneAndDelete({
            lexemeId,
            learnerId
        }).populate({
            path: 'lexeme'
        });

        if (!record) throw {
            code: 404,
            message: 'Не найдено'
        };

        return record.lexeme;
    },

    async updateLexemeStatus(lexemeId, learnerId, status) {
        const record = await LexemeRecord.findOneAndUpdate(
            {
                lexemeId,
                learnerId
            },
            {
                status
            },
            {
                new: true,
                upsert: true
            }
        );

        if (!record)
            throw {
                code: 404,
                message: 'Не найдено'
            };

        return record;
    }
});

function transformRecord(record) {
    return (
        record && {
            data: record.data,
            status: record.status,
            reviewDate: record.reviewDate
        }
    );
}