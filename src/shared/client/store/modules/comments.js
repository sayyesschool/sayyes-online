import { createAction, createReducer, combineReducers } from 'shared/store';

const path = '/comments';

export const getComments = createAction('GET_COMMENTS', query => ({
    request: {
        method: 'get',
        url: path,
        query
    }
}));

export const getComment = createAction('GET_COMMENT', id => ({
    request: {
        method: 'get',
        url: `${path}/${id}`
    }
}));

export const createComment = createAction('CREATE_COMMENT', data => ({
    request: {
        method: 'post',
        url: path,
        body: data
    }
}));

export const updateComment = createAction('UPDATE_COMMENT', (id, data) => ({
    request: {
        method: 'put',
        url: `${path}/${id}`,
        body: data
    }
}));

export const deleteComment = createAction('DELETE_COMMENT', (id, data) => ({
    request: {
        method: 'delete',
        url: `${path}/${id}`,
        body: data
    }
}));

export const actions = {
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
};

export const commentsReducer = createReducer(null, {});

export const commentReducer = createReducer(null, {});

export default combineReducers({
    list: commentsReducer,
    single: commentReducer
});