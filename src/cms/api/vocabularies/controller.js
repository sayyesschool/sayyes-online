export default ({
    models: { Lexeme, Vocabulary }
}) => ({
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

    async search(req, res) {
        const regex = req.query.q && new RegExp(req.query.q, 'i');
        const batch = Number(req.query.p ?? 1);
        const limit = Number(req.query.c ?? 0);
        const skip = (batch - 1) * limit;
        const query = { value: regex, publishStatus: 'approved' };

        const [count, lexemes] = await Promise.all([
            Lexeme.countDocuments(query),
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
    }
});