import { createAction, createReducer, combineReducers } from 'shared/store/helpers';

const PATH = 'rooms';

export const getRooms = createAction('GET_ROOMS', query => ({
    request: {
        method: 'get',
        path: PATH,
        query
    }
}));

export const getRoom = createAction('GET_ROOM', id => ({
    request: {
        method: 'get',
        path: `${PATH}/${id}`
    }
}));

export const createRoom = createAction('CREATE_ROOM', data => ({
    request: {
        method: 'post',
        path: PATH,
        body: data
    }
}));

export const updateRoom = createAction('UPDATE_ROOM', (id, data) => ({
    request: {
        method: 'put',
        path: `${PATH}/${id}`,
        body: data
    }
}));

export const deleteRoom = createAction('DELETE_ROOM', (id, data) => ({
    request: {
        method: 'delete',
        path: `${PATH}/${id}`,
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