import { createAction, createReducer, combineReducers } from 'shared/store';

export const getAssignments = createAction('GET_ASSIGNMENTS', () => ({
    request: {
        method: 'get',
        url: '/assignments'
    }
}));

export const getAssignment = createAction('GET_ASSIGNMENT', id => ({
    request: {
        method: 'get',
        url: `/assignments/${id}`
    }
}));

export const unsetAssignment = createAction('UNSET_ASSIGNMENT');

export const createAssignment = createAction('CREATE_ASSIGNMENT', data => ({
    request: {
        method: 'post',
        url: '/assignments',
        body: data
    }
}));

export const updateAssignment = createAction('UPDATE_ASSIGNMENT', (id, data) => ({
    request: {
        method: 'put',
        url: `/assignments/${id}`,
        body: data
    }
}));

export const deleteAssignment = createAction('DELETE_ASSIGNMENT', id => ({
    request: {
        method: 'delete',
        url: `/assignments/${id}`
    }
}));

export const createComment = createAction('CREATE_ASSIGNMENT_COMMENT', (id, data) => ({
    request: {
        method: 'post',
        url: `/assignments/${id}/comments`,
        body: data
    }
}));

export const updateComment = createAction('UPDATE_ASSIGNMENT_COMMENT', (postId, commentId, data) => ({
    request: {
        method: 'put',
        url: `/assignments/${postId}/comments/${commentId}`,
        body: data
    }
}));

export const deleteComment = createAction('DELETE_ASSIGNMENT_COMMENT', (postId, commentId) => ({
    request: {
        method: 'delete',
        url: `/assignments/${postId}/comments/${commentId}`
    }
}));

export const actions = {
    getAssignments,
    getAssignment,
    unsetAssignment,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    createComment,
    updateComment,
    deleteComment
};

export const assignmentsReducer = createReducer(null, {
    [getAssignments]: (state, action) => action.data,
    [createAssignment]: (state, action) => state?.concat(action.data) || [action.data],
    [deleteAssignment]: (state, action) => state?.map(assignment =>
        assignment.id !== action.data.id ?
            assignment :
            { ...assignment, ...action.data }
    )
});

export const assignmentReducer = createReducer(null, {
    [getAssignment]: (state, action) => action.data,
    [unsetAssignment]: () => null,
    [updateAssignment]: (state, action) => ({ ...state, ...action.data }),
    [deleteAssignment]: () => null,
    [createComment]: (state, action) => ({
        ...state,
        comments: state.comments.concat(action.data)
    }),
    [updateComment]: (state, action) => ({
        ...state,
        comments: state.comments.map(comment => comment.id !== action.data.id ?
            comment :
            action.data
        )
    }),
    [deleteComment]: (state, action) => ({
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.data.id)
    }),
});

export default combineReducers({
    list: assignmentsReducer,
    single: assignmentReducer
});