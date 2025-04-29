export default ({
    models: { Lexeme, LexemeRecord, Vocabulary }
}) => ({
    async search({ q, p, c }) {
        const regex = q && new RegExp(q, 'i');
        const batch = Number(p ?? 1);
        const limit = Number(c ?? 0);
        const skip = (batch - 1) * limit;
        const query = { value: regex, publishStatus: 'approved' };

        const [count, lexemes] = await Promise.all([
            Lexeme.countDocuments(query),
            Lexeme.find(query).skip(skip).limit(limit)
        ]);

        const more = skip + lexemes.length < count;

        return {
            meta: {
                totalCount: count,
                count: lexemes.length,
                batch,
                more
            },
            lexemes
        };
    },

    async getMany(learnerId) {
        return await Vocabulary.find({
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

    async getMy(learnerId, userId) {
    // TODO: убрать костыль
        if (learnerId === '') {
            throw {
                code: 404,
                message: 'Словарь не найден'
            };
        }

        const records = await LexemeRecord.find({
            learnerId: learnerId || userId
        })
            .sort({ createdAt: -1 })
            .populate('lexeme');

        const lexemes = records.map(record => ({
            ...record.lexeme.toJSON(),
            status: record.status,
            reviewDate: record.reviewDate,
            data: record.data
        }));

        return lexemes;
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
        userId,
        vocabularyId,
        reqVocabulary,
        { learnerId, lexemeId, value, translation, definition }
    ) {
        let lexeme = await (lexemeId
            ? Lexeme.findById(lexemeId)
            : Lexeme.findOne({
                value: value,
                translation: translation,
                publishStatus: 'approved'
            }));

        if (!lexeme) {
            lexeme = await Lexeme.create({
                value: value,
                translation: translation,
                definition: definition,
                createdBy: userId
            });
        }

        let record = await LexemeRecord.findOne({
            lexemeId: lexeme.id,
            learnerId: learnerId || userId
        });

        if (lexeme && !record) {
            record = await LexemeRecord.create({
                lexemeId: lexeme.id,
                learnerId: learnerId || userId
            });
        } else {
            throw {
                code: 403,
                message: 'Слово уже добавлено'
            };
        }

        const data = { ...lexeme.toJSON(), ...this.transformRecord(record) };

        if (vocabularyId) {
            await reqVocabulary.addLexeme(lexeme.id);
            data.vocabularyId = reqVocabulary.id;
        }

        return data;
    },

    async updateLexeme(
        userId,
        vocabularyId,
        { lexemeId, vocabulary },
        { image, definition, translation, examples }
    ) {
        const lexeme = await Lexeme.findById(lexemeId);

        if (!lexeme)
            throw {
                code: 404,
                message: 'Не найдено'
            };

        const updateData = {
            image: image,
            definition: definition,
            translation: translation,
            examples: examples
        };

        const updatedLexeme = !lexeme.isApproved
            ? await Lexeme.findOneAndUpdate(
                {
                    _id: lexemeId,
                    createdBy: userId
                },
                updateData,
                { new: true }
            ).populate({
                path: 'record',
                match: { learnerId: userId },
                transform: this.transformRecord
            })
            : await LexemeRecord.findOneAndUpdate(
                {
                    lexemeId: lexemeId,
                    learnerId: userId
                },
                {
                    data: updateData
                },
                {
                    new: true,
                    upsert: true
                }
            )
                .populate({
                    path: 'lexeme'
                })
                .then(record => {
                    const lexeme = record.lexeme;

                    lexeme.record = this.transformRecord(record);

                    return lexeme;
                });

        if (!updatedLexeme)
            throw {
                code: 403,
                message: 'Данные нельзя обновить'
            };

        const data = updatedLexeme.toJSON();

        if (vocabulary) {
            data.vocabularyId = vocabularyId;
        }

        return data;
    },

    async removeLexeme(vocabulary, lexemeId) {
        await vocabulary.removeLexeme(lexemeId);
    },

    async deleteLexeme(lexemeId, learnerId) {
        const record = await LexemeRecord.findOneAndDelete({
            lexemeId,
            learnerId
        }).populate({
            path: 'lexeme'
        });

        if (!record)
            throw {
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
    },

    transformRecord(record) {
        return (
            record && {
                data: record.data,
                status: record.status,
                reviewDate: record.reviewDate
            }
        );
    },

    transformLexeme(lexeme) {
        return {
            ...lexeme,
            ...lexeme.record,
            record: undefined
        };
    }
});