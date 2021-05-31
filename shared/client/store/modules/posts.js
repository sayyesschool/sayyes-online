import { createAction, createReducer, combineReducers } from 'shared/store';

export const getPosts = createAction('GET_POSTS', query => ({
    request: {
        method: 'get',
        url: '/posts',
        query
    }
}));

export const getPost = createAction('GET_POST', id => ({
    request: {
        method: 'get',
        url: `/posts/${id}`
    }
}));

export const unsetPost = createAction('UNSET_POST');

export const createPost = createAction('CREATE_POST', data => ({
    request: {
        method: 'post',
        url: '/posts',
        body: data
    }
}));

export const updatePost = createAction('UPDATE_POST', (id, data) => ({
    request: {
        method: 'put',
        url: `/posts/${id}`,
        body: data
    }
}));

export const deletePost = createAction('DELETE_POST', id => ({
    request: {
        method: 'delete',
        url: `/posts/${id}`
    }
}));

export const createComment = createAction('CREATE_POST_COMMENT', (id, data) => ({
    request: {
        method: 'post',
        url: `/posts/${id}/comments`,
        body: data
    }
}));

export const updateComment = createAction('UPDATE_POST_COMMENT', (postId, commentId, data) => ({
    request: {
        method: 'put',
        url: `/posts/${postId}/comments/${commentId}`,
        body: data
    }
}));

export const deleteComment = createAction('DELETE_POST_COMMENT', (postId, commentId) => ({
    request: {
        method: 'delete',
        url: `/posts/${postId}/comments/${commentId}`
    }
}));

export const actions = {
    getPosts,
    getPost,
    unsetPost,
    createPost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment
};

export const postsReducer = createReducer(null, {
    [getPosts]: (state, action) => action.data,
    [createPost]: (state, action) => state?.concat(action.data).sort(sortByDate) || [action.data],
    [updatePost]: (state, action) => state?.map(post => post.id !== action.data.id ? post : {
        ...post,
        ...action.data
    }),
    [deletePost]: (state, action) => state?.filter(post => post.id !== action.data.id),
    [createComment]: (state, action) => state?.map(post => post.id !== action.data.postId ? post : ({
        ...post,
        comments: post.comments.concat(action.data)
    })),
    [updateComment]: (state, action) => state?.map(post => post.id !== action.data.postId ? post : ({
        ...post,
        comments: post.comments.map(comment => comment.id !== action.data.id ?
            comment :
            action.data
        )
    })),
    [deleteComment]: (state, action) => state?.map(post => post.id !== action.data.postId ? post : ({
        ...post,
        comments: post.comments.filter(comment => comment.id !== action.data.id)
    }))
});

export const postReducer = createReducer(null, {
    [getPost]: (state, action) => action.data,
    [unsetPost]: (state, action) => null,
    [updatePost]: (state, action) => state && ({ ...state, ...action.data }),
    [deletePost]: (state, action) => null,
    [createComment]: (state, action) => ({
        ...state,
        comments: state && state.comments.concat(action.data)
    }),
    [updateComment]: (state, action) => state && ({
        ...state,
        comments: state.comments.map(comment => comment.id !== action.data.id ?
            comment :
            action.data
        )
    }),
    [deleteComment]: (state, action) => state && ({
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.data.id)
    })
});

export default combineReducers({
    list: postsReducer,
    single: postReducer
});

function sortByDate(a, b) {
    if (a.createAt === b.createdAt) return 0;
    if (a.createdAt < b.createdAt) return 1;
    else return -1;
}