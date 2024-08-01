import { combineReducers, createAction, createReducer } from 'shared/store/helpers';

const PATH = 'comments';

export const getComments = createAction('GET_COMMENTS', query => ({
    request: {
        method: 'get',
        path: PATH,
        query
    }
}));

export const getComment = createAction('GET_COMMENT', id => ({
    request: {
        method: 'get',
        path: `${PATH}/${id}`
    }
}));

export const createComment = createAction('CREATE_COMMENT', data => ({
    request: {
        method: 'post',
        path: PATH,
        body: data
    }
}));

export const updateComment = createAction('UPDATE_COMMENT', (id, data) => ({
    request: {
        method: 'put',
        path: `${PATH}/${id}`,
        body: data
    }
}));

export const deleteComment = createAction('DELETE_COMMENT', (id, data) => ({
    request: {
        method: 'delete',
        path: `${PATH}/${id}`,
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