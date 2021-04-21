import { createAction, createReducer, combineReducers } from 'shared/store';

const path = '/packs';

export const getPacks = createAction('GET_PACKS', query => ({
    request: {
        method: 'get',
        url: path,
        query
    }
}));

export const getPack = createAction('GET_PACK', id => ({
    request: {
        method: 'get',
        url: `${path}/${id}`
    }
}));

export const createPack = createAction('CREATE_PACK', data => ({
    request: {
        method: 'post',
        url: path,
        body: data
    }
}));

export const updatePack = createAction('UPDATE_PACK', (id, data) => ({
    request: {
        method: 'put',
        url: `${path}/${id}`,
        body: data
    }
}));

export const deletePack = createAction('DELETE_PACK', (id, data) => ({
    request: {
        method: 'delete',
        url: `${path}/${id}`,
        body: data
    }
}));

export const actions = {
    getPacks,
    getPack,
    createPack,
    updatePack,
    deletePack
};

export const packsReducer = createReducer(null, {
    [getPacks]: (state, action) => action.data,
    [createPack]: (state, action) => state?.concat(action.data) || [action.data],
    [updatePack]: (state, action) => state && state.map(pack => pack.id !== action.data.id ? pack : { ...pack, ...action.data }),
    [deletePack]: (state, action) => state && state.filter(pack => pack.id !== action.data.id)
});

export const packReducer = createReducer(null, {
    [getPack]: (state, action) => action.data,
    [updatePack]: (state, action) => action.data,
    [deletePack]: (state, action) => null
});

export default combineReducers({
    list: packsReducer,
    single: packReducer
});