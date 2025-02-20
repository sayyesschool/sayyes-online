const ROOT_PATH = process.cwd();

const imports = {
    config: `${ROOT_PATH}/src/config.js`,
    db: `${ROOT_PATH}/src/db.js`,
    api: `${ROOT_PATH}/src/api/`,
    auth: `${ROOT_PATH}/src/auth/`,
    core: `${ROOT_PATH}/src/core/`,
    club: `${ROOT_PATH}/src/club/`,
    cms: `${ROOT_PATH}/src/cms/`,
    crm: `${ROOT_PATH}/src/crm/`,
    lk: `${ROOT_PATH}/src/lk/`,
    lms: `${ROOT_PATH}/src/lms/`,
    pay: `${ROOT_PATH}/src/pay/`,
    server: `${ROOT_PATH}/src/server/`,
    shared: `${ROOT_PATH}/src/shared/`,
    test: `${ROOT_PATH}/test/`,
    webhooks: `${ROOT_PATH}/src/webhooks/`
};

export async function resolve(specifier, context, nextResolve) {
    let [name, ...rest] = specifier.split('/');

    if (name === '@') {
        name = rest.shift();
    }

    if (name in imports) {
        return nextResolve(imports[name] + rest.join('/'), context);
    }

    return nextResolve(specifier, context);
}