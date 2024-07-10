export default ({
    models: { Lexeme, LexemeRecord, Vocabulary }
}) => ({
    async search(req, res) {
        const regex = req.query.q && new RegExp(req.query.q, 'i');
        const batch = Number(req.query.p ?? 1);
        const limit = Number(req.query.c ?? 0);
        const skip = (batch - 1) * limit;
        const query = { value: regex, approved: true };

        const [count, lexemes] = await Promise.all([
            Lexeme.count(query),
            Lexeme.find(query)
                .skip(skip)
                .limit(limit)
        ]);

        const more = skip + lexemes.length < count;

        res.json({
            ok: true,
            meta: {
                totalCount: count,
                count: lexemes.length,
                batch,
                more
            },
            data: lexemes
        });
    },

    async getMany(req, res) {
        const vocabularies = await Vocabulary.find({
            learnerId: req.user.id
        });

        res.json({
            ok: true,
            data: vocabularies
        });
    },

    async getMy(req, res) {
        const records = await LexemeRecord.find({
            learnerId: req.user.id
        }).populate('lexeme');

        const lexemes = records.map(record => ({
            ...record.lexeme.toJSON(),
            status: record.status,
            reviewDate: record.reviewDate,
            data: record.data
        }));

        res.json({
            ok: true,
            data: {
                id: 'my',
                title: 'Мой словарь',
                lexemes,
                lexemeIds: lexemes.map(lexeme => lexeme.id),
                learnerId: req.user.id
            }
        });
    },

    async getOne(req, res) {
        const vocabulary = await req.vocabulary.populate({
            path: 'lexemes',
            populate: {
                path: 'record',
                transform: transformRecord
            }
        });

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
        const vocabulary = await Vocabulary.findByIdAndUpdate(req.params.vocabularyId, {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image
        }, {
            new: true
            // select: Object.keys(req.body).join(' ')
        });

        res.json({
            ok: true,
            data: vocabulary
        });
    },

    async delete(req, res) {
        const vocabulary = await Vocabulary.findByIdAndDelete(req.params.vocabularyId);

        res.json({
            ok: true,
            data: {
                id: vocabulary.id
            }
        });
    },

    async addLexeme(req, res) {
        let lexeme = await (req.body.lexemeId
            ? Lexeme.findById(req.body.lexemeId).populate({
                path: 'record',
                transform: transformRecord
            })
            : Lexeme.findOne({
                value: req.body.value,
                translation: req.body.translation,
                approved: true
            }).populate({
                path: 'record',
                transform: transformRecord
            }));

        if (!lexeme) {
            lexeme = await Lexeme.create({
                value: req.body.value,
                translation: req.body.translation,
                definition: req.body.definition,
                createdBy: req.user.id
            });
        }

        const record = await LexemeRecord.create({
            lexemeId: lexeme.id,
            learnerId: req.user.id
        });

        const data = lexeme.toJSON();

        data.status = record.status;
        data.reviewDate = record.reviewDate;

        if (req.params.id) {
            await req.vocabulary.addLexeme(lexeme.id);
            data.vocabularyId = req.vocabulary.id;
        }

        res.json({
            ok: true,
            data
        });
    },

    async updateLexeme(req, res) {
        let record;
        const updateData = {
            image: req.body.image,
            definition: req.body.definition,
            translation: req.body.translation,
            examples: req.body.examples
        };

        const lexeme = await Lexeme.findOneAndUpdate(
            {
                _id: req.params.lexemeId,
                approved: false
            },
            updateData,
            { new: true }
        ).populate({
            path: 'record',
            transform: transformRecord
        });

        if (!lexeme) {
            record = await LexemeRecord.findOneAndUpdate(
                {
                    lexemeId: req.params.lexemeId,
                    learnerId: req.user.id
                },
                {
                    data: updateData
                },
                {
                    new: true,
                    upsert: true
                }
            );
        }

        if (!lexeme && !record) throw {
            code: 404,
            message: 'Не найдено'
        };

        const data = lexeme.toJSON();

        if (req.params.vocabulary) {
            data.vocabularyId = req.vocabulary.id;
        }

        res.json({
            ok: true,
            data: {
                lexeme,
                record,
                lexemeId: req.params.lexemeId
            }
        });
    },

    async removeLexeme(req, res) {
        await req.vocabulary.removeLexeme(req.params.lexemeId);

        res.json({
            ok: true,
            data: {
                id: req.params.lexemeId,
                vocabularyId: req.params.vocabularyId
            }
        });
    },

    async deleteLexeme(req, res) {
        await LexemeRecord.deleteOne({
            learnerId: req.user.id,
            lexemeId: req.params.lexemeId
        });

        res.json({
            ok: true,
            data: {
                id: req.params.lexemeId
            }
        });
    },

    async updateLexemeStatus(req, res) {
        const record = await LexemeRecord.findOneAndUpdate({
            lexemeId: req.params.lexemeId,
            learnerId: req.user.id
        }, {
            status: req.body.status
        }, {
            new: true,
            upsert: true
        });

        if (!record) throw {
            code: 404,
            message: 'Не найдено'
        };

        res.json({
            ok: true,
            data: {
                lexemeId: req.params.lexemeId,
                record: {
                    data: record.data,
                    status: record.status,
                    reviewDate: record.reviewDate
                }
            }
        });
    }
});

const transformRecord = record => record && {
    data: record.data,
    status: record.status,
    reviewDate: record.reviewDate
};