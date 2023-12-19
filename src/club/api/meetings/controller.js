module.exports = ({
    models: { Meeting }
}) => ({
    async getMany(req, res) {
        const meetings = await Meeting.find()
            .populate('host', 'firstname lastname imageUrl')
            .sort({ date: -1 });
        
        res.send({
            ok: true,
            data: meetings
        });
    },
    async getOne(req, res) {
        const meeting = await Meeting.findOne({ _id: req.params.id })
            .populate('host', 'firstname lastname imageUrl')
            .sort({ date: -1 });
        
        res.send({
            ok: true,
            data: meeting
        });
    }
});