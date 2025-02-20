export default ({
    services: { Storage }
}) => ({
    async uploadFile(req, res) {
        if (!req.file) throw new Error('No file');
        if (!req.body.path) throw new Error('No path');

        const file = req.file;
        const path = Storage.getNormalizedPath(req.body.path, file);
        const response = await Storage.put(path, file.buffer);

        res.json({
            ok: true,
            data: {
                url: response.url,
                path: response.path
            }
        });
    },

    async deleteFile(req, res) {
        if (!req.body.path) throw new Error('No path');

        const path = Storage.getNormalizedPath(req.body.path, {});
        const response = await Storage.delete(path);

        res.json({
            ok: true,
            data: {
                url: response.url,
                path: response.path
            }
        });
    }
});