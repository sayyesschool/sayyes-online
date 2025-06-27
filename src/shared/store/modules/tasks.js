import { combineReducers, createAction, createReducer } from 'shared/store/helpers';

export const getTasks = createAction('GET_TASKS', query => ({
    request: {
        method: 'get',
        path: 'tasks',
        query
    }
}));

export const getTask = createAction('GET_TASK', id => ({
    request: {
        method: 'get',
        path: `tasks/${id}`
    }
}));

export const createTask = createAction('CREATE_TASK', data => ({
    request: {
        method: 'post',
        path: 'tasks',
        body: data
    }
}));

export const updateTask = createAction('UPDATE_TASK', (id, data) => ({
    request: {
        method: 'put',
        path: `tasks/${id}`,
        body: data
    }
}));

export const deleteTask = createAction('DELETE_TASK', id => ({
    request: {
        method: 'delete',
        path: `tasks/${id}`
    }
}));

export const unsetTask = createAction('UNSET_TASK');

export const actions = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    unsetTask
};

export const tasksReducer = createReducer(null, {
    [getTasks]: (state, action) => action.data,
    [createTask]: (state, action) =>
        state ? [action.data, ...state] : [action.data],
    [updateTask]: (state, action) =>
        state &&
    state.map(payment =>
        payment.id !== action.data.id ? payment : action.data
    ),
    [deleteTask]: (state, action) =>
        state && state.filter(payment => payment.id !== action.data.id)
});

export const taskReducer = createReducer(null, {
    [getTask]: (state, action) => action.data,
    [unsetTask]: (state, action) => null
});

export default combineReducers({
    list: tasksReducer,
    single: taskReducer
});