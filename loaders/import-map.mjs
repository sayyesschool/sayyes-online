import { join } from 'node:path';

const ROOT_PATH = process.cwd();

const imports = {
    'config': `${ROOT_PATH}/src/config.js`,
    'core': `${ROOT_PATH}/src/core/index.js`,
    'db': `${ROOT_PATH}/src/db.js`,
    'auth': `${ROOT_PATH}/src/auth/index.js`,
    'cms': `${ROOT_PATH}/src/cms/index.js`,
    'crm': `${ROOT_PATH}/src/crm/index.js`,
    'lms': `${ROOT_PATH}/src/lms/index.js`
};

export async function resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('@/')) {
        specifier = specifier.replace('@', join(ROOT_PATH, 'src'));
    }

    if (Object.hasOwn(imports, specifier)) {
        return nextResolve(imports[specifier], context);
    }

    return nextResolve(specifier, context);
}