import { createAction, createReducer, combineReducers } from 'shared/store';

const BASE_URL = `${APP_URL}/class/api`;

export const getMaterials = createAction('GET_MATERIALS', query => ({
    request: {
        method: 'get',
        url: BASE_URL + '/materials',
        query
    }
}));

export const getMaterial = createAction('GET_MATERIAL', id => ({
    request: {
        method: 'get',
        url: BASE_URL + `/materials/${id}`
    }
}));

export const unsetMaterial = createAction('UNSET_MATERIAL');

export const createMaterial = createAction('CREATE_MATERIAL', data => ({
    request: {
        method: 'post',
        url: BASE_URL + '/materials',
        body: data
    }
}));

export const updateMaterial = createAction('UPDATE_MATERIAL', (id, data) => ({
    request: {
        method: 'put',
        url: BASE_URL + `/materials/${id}`,
        body: data
    }
}));

export const deleteMaterial = createAction('DELETE_MATERIAL', (id, data) => ({
    request: {
        method: 'delete',
        url: BASE_URL + `/materials/${id}`,
        body: data
    }
}));

export const actions = {
    getMaterials,
    getMaterial,
    unsetMaterial,
    createMaterial,
    updateMaterial,
    deleteMaterial
};

export const materialsReducer = createReducer(null, {
    [getMaterials]: (state, action) => action.data,
    [createMaterial]: (state, action) => state?.concat(action.data) || [action.data]
});

export const materialReducer = createReducer(null, {
    [getMaterial]: (state, action) => action.data,
    [unsetMaterial]: (state, action) => null,
    [updateMaterial]: (state, action) => action.data,
    [deleteMaterial]: (state, action) => null
});

export default combineReducers({
    list: materialsReducer,
    single: materialReducer
});