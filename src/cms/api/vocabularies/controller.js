export default ({
    models: { Vocabulary }
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
    }
});