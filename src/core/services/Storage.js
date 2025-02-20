import { basename, extname, join } from 'node:path/posix';

import { v4 as uuid } from 'uuid';

export default ({
    config: { STORAGE_URL },
    clients: { storage }
}) => ({
    isFilename(path) {
        return basename(path).includes('.');
    },

    getUniqueFilename(file) {
        return uuid() + extname(file.originalname);
    },

    getNormalizedPath(path, file) {
        if (path.includes(STORAGE_URL)) {
            path = new URL(path).pathname.split('/').slice(2).join('/');
        }

        return this.isFilename(path) ? path : join(path, this.getUniqueFilename(file));
    },

    put: storage.put,
    delete: storage.delete
});