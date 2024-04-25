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
        const vocabulary = await req.vocabulary.populate({
            path: 'lexemes',
            populate: {
                path: 'data',
                match: {
                    learnerId: req.user.id
                },
                transform: record => record && ({
                    status: record.status,
                    reviewDate: record.reviewDate
                })
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
            new: true,
            select: Object.keys(req.body).join(' ')
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
        const lexeme = await (req.body.lexemeId ?
            Lexeme.findById(req.body.lexemeId) :
            Lexeme.create({
                value: req.body.value,
                translations: req.body.translation,
                definition: req.body.definition,
                createdBy: req.user.id
            })
        );

        const record = await LexiconRecord.create({
            lexemeId: lexeme.id,
            learnerId: req.user.id
        });

        await req.vocabulary.addLexeme(lexeme.id);

        const data = lexeme.toJSON();

        data.vocabularyId = req.vocabulary.id;
        data.status = record.status;
        data.reviewDate = record.reviewDate;

        res.json({
            ok: true,
            data
        });
    },

    async updateLexeme(req, res) {
        const lexeme = await Lexeme.findOneAndUpdate({
            _id: req.params.lexemeId,
            createdBy: req.user.id
        }, {
            definition: req.body.definition,
            translations: req.body.translation,
            examples: req.body.examples
        }, {
            new: true
        });

        if (!lexeme) throw {
            code: 404,
            message: 'Не найдено'
        };

        const data = lexeme.toJSON();

        data.vocabularyId = req.vocabulary.id;

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
    }
});