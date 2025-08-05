export default ({
    services: { Storage }
}) => ({
    async uploadFile(req, res) {
        const file = req.file;
        const path = req.body.path || req.url;

        if (!file) throw new Error('No file');
        if (!path) throw new Error('No path');

        const normalizedPath = Storage.getNormalizedPath(req.body.path, file);
        const response = await Storage.put(normalizedPath, file.buffer);

        res.json({
            ok: true,
            data: {
                url: response.url,
                path: response.path
            }
        });
    },

    async deleteFile(req, res) {
        const path = req.body?.path || req.url;

        if (!path) throw new Error('No path');

        const normalizedPath = Storage.getNormalizedPath(path, {});
        const response = await Storage.delete(normalizedPath);

        res.json({
            ok: true,
            data: {
                url: response.url,
                path: response.path
            }
        });
    }
});