import { createAction, createReducer, combineReducers } from 'shared/store';

export const getMaterials = createAction('GET_MATERIALS', query => ({
    request: {
        method: 'get',
        url: '/materials',
        query
    }
}));

export const getMaterial = createAction('GET_MATERIAL', id => ({
    request: {
        method: 'get',
        url: `/materials/${id}`
    }
}));

export const createMaterial = createAction('CREATE_MATERIAL', data => ({
    request: {
        method: 'post',
        url: '/materials',
        body: data
    }
}));

export const updateMaterial = createAction('UPDATE_MATERIAL', (id, data) => ({
    request: {
        method: 'put',
        url: `/materials/${id}`,
        body: data
    }
}));

export const deleteMaterial = createAction('DELETE_MATERIAL', (id, data) => ({
    request: {
        method: 'put',
        url: `/materials/${id}`,
        body: data
    }
}));

export const actions = {
    getMaterials,
    getMaterial,
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
    [updateMaterial]: (state, action) => action.data,
    [deleteMaterial]: (state, action) => null
});

export default combineReducers({
    list: materialsReducer,
    single: materialReducer
});