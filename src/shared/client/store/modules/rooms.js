import { createAction, createReducer, combineReducers } from 'shared/store/helpers';

const PATH = 'rooms';

export const getRooms = createAction('GETdd_ROOMS', query => ({
    request: {
        method: 'get',
        url: PATH,
        query
    }
}));

export const getRoom = createAction('GETdd_ROOM', id => ({
    request: {
        method: 'get',
        url: `${PATH}/${id}`
    }
}));

export const createRoom = createAction('CREATEdd_ROOM', data => ({
    request: {
        method: 'post',
        url: PATH,
        body: data
    }
}));

export const updateRoom = createAction('UPDATEdd_ROOM', (id, data) => ({
    request: {
        method: 'put',
        url: `${PATH}/${id}`,
        body: data
    }
}));

export const deleteRoom = createAction('DELETEdd_ROOM', (id, data) => ({
    request: {
        method: 'delete',
        url: `${PATH}/${id}`,
        body: data
    }
}));

export const actions = {
    getRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
};

export const roomsReducer = createReducer(null, {
    [getRooms]: (state, action) => action.data,
    [createRoom]: (state, action) => state?.concat(action.data) || [action.data],
    [updateRoom]: (state, action) => state && state.map(room => room.id !== action.data.id ? room : { ...room, ...action.data }),
    [deleteRoom]: (state, action) => state && state.filter(room => room.id !== action.data.id)
});

export const roomReducer = createReducer(null, {
    [getRoom]: (state, action) => action.data,
    [updateRoom]: (state, action) => action.data,
    [deleteRoom]: (state, action) => null
});

export default combineReducers({
    list: roomsReducer,
    single: roomReducer
});