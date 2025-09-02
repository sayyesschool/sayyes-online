import { createAction } from 'shared/store/helpers';

const PATH = 'settings';

export const getSettings = createAction('GET_SETTINGS', query => ({
    request: {
        method: 'get',
        path: PATH
    }
}));

export const getSetting = createAction('GET_SETTING', key => ({
    request: {
        method: 'get',
        path: `${PATH}/${key}`
    }
}));

export const setSetting = createAction('SET_SETTING', (key, value) => ({
    request: {
        method: 'put',
        path: `${PATH}/${key}`,
        body: value
    }
}));

export const actions = {
    getSettings,
    getSetting,
    setSetting
};