const ROOT_PATH = process.cwd();

const imports = {
    'config': `${ROOT_PATH}/src/config.js`,
    'core': `${ROOT_PATH}/src/core/index.js`,
    'db': `${ROOT_PATH}/src/db.js`
};

export async function resolve(specifier, context, nextResolve) {
    if (Object.hasOwn(imports, specifier)) {
        return nextResolve(imports[specifier], context);
    }

    return nextResolve(specifier, context);
}