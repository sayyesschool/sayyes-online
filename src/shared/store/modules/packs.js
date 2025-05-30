import { combineReducers, createAction, createReducer } from 'shared/store/helpers';

const PATH = 'packs';

export const getPacks = createAction('GET_PACKS', query => ({
    request: {
        method: 'get',
        path: PATH,
        query
    }
}));

export const getPack = createAction('GET_PACK', id => ({
    request: {
        method: 'get',
        path: `${PATH}/${id}`
    }
}));

export const createPack = createAction('CREATE_PACK', data => ({
    request: {
        method: 'post',
        path: PATH,
        body: data
    }
}));

export const updatePack = createAction('UPDATE_PACK', (id, data) => ({
    request: {
        method: 'put',
        path: `${PATH}/${id}`,
        body: data
    }
}));

export const deletePack = createAction('DELETE_PACK', (id, data) => ({
    request: {
        method: 'delete',
        path: `${PATH}/${id}`,
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