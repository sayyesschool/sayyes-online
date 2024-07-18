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
            $or: [
                { learnerId: req.user.id },
                { learnerId: { $exists: false } }
            ]
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
                numberOfLexemes: lexemes.length,
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

        const data = vocabulary.toJSON();

        data.lexemes = data.lexemes.map(lexeme => ({
            ...lexeme,
            status: 0,
            ...lexeme.record,
            record: undefined
        }));

        res.json({
            ok: true,
            data
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
        let lexeme = await (req.body.lexemeId ?
            Lexeme.findById(req.body.lexemeId) :
            Lexeme.findOne({
                value: req.body.value,
                translation: req.body.translation,
                approved: true
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

        if (req.params.vocabularyId) {
            await req.vocabulary.addLexeme(lexeme.id);
            data.vocabularyId = req.vocabulary.id;
        }

        res.json({
            ok: true,
            data
        });
    },

    async updateLexeme(req, res) {
        const lexeme = await Lexeme.findById(req.params.lexemeId, 'approved');

        if (!lexeme) throw {
            code: 404,
            message: 'Не найдено'
        };

        const updateData = {
            image: req.body.image,
            definition: req.body.definition,
            translation: req.body.translation,
            examples: req.body.examples
        };

        const updatedLexeme = !lexeme.approved ?
            await Lexeme.findOneAndUpdate(
                {
                    _id: req.params.lexemeId,
                    createdBy: req.user.id
                },
                updateData,
                { new: true }
            ).populate({
                path: 'record',
                match: { learnerId: req.user.id },
                transform: transformRecord
            })
            :
            await LexemeRecord.findOneAndUpdate(
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
            ).populate({
                path: 'lexeme'
            }).then(record => ({
                ...record.lexeme,
                ...transformRecord(record)
            }));

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
            data
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
        const record = await LexemeRecord.findOneAndDelete({
            lexemeId: req.params.lexemeId,
            learnerId: req.user.id
        });

        if (!record) throw {
            code: 404,
            message: 'Не найдено'
        };

        res.json({
            ok: true,
            data: {
                id: record.lexemeId
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
                id: record.lexemeId,
                data: record.data,
                status: record.status,
                reviewDate: record.reviewDate
            }
        });
    }
});

const transformRecord = record => record && {
    data: record.data,
    status: record.status,
    reviewDate: record.reviewDate
};