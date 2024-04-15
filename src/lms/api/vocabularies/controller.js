export default ({
    models: { Lexeme, Lexicon, Vocabulary }
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
            path: 'lexeme',
            populate: {
                path: 'data'
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
        let lexeme;

        if (req.body.lexemeId) {
            lexeme = await Lexeme.findById(req.body.lexemeId);
        } else {
            lexeme = await Lexeme.create({
                value: req.body.value,
                translations: [req.body.translation],
                authorId: req.user.id
            });
        }

        await Lexicon.create({
            lexemeId: lexeme.id,
            learnerId: req.user.id
        });

        const data = lexeme.toJSON();

        data.vocabularyId = req.vocabulary.id;

        res.json({
            ok: true,
            data
        });
    },

    async updateLexeme(req, res) {
        const lexeme = await Lexeme.findByIdAndUpdate(req.params.lexemeId, {
            translation: [req.body.translation]
        }, {
            new: true
        });

        const data = lexeme.toJSON();

        data.vocabularyId = req.vocabulary.id;

        res.json({
            ok: true,
            data
        });
    },

    async removeLexeme(req, res) {
        const lexeme = await Lexeme.findByIdAndDelete(req.params.lexemeId);

        res.json({
            ok: true,
            data: {
                id: lexeme.id,
                vocabularyId: req.vocabulary.id
            }
        });
    }
});