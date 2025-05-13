import { createAction, createReducer } from 'shared/store/helpers';

export const getDictionary = createAction('GET_DICTIONARY', query => ({
    request: {
        method: 'get',
        path: 'dictionary',
        query
    }
}));

export const unsetDictionary = createAction('UNSET_DICTIONARY');

export const createLexeme = createAction('DICTIONARY_CREATE_LEXEME', data => ({
    request: {
        method: 'post',
        path: 'dictionary',
        body: data
    }
}));

export const updateLexeme = createAction('DICTIONARY_UPDATE_LEXEME', (lexemeId, data) => ({
    request: {
        method: 'put',
        path: `dictionary/${lexemeId}`,
        body: data
    }
}));

export const approveLexeme = createAction('DICTIONARY_APPROVE_LEXEME', (lexemeId, data) => ({
    request: {
        method: 'post',
        path: `dictionary/${lexemeId}`,
        body: data
    }
}));

export const mergeLexemes = createAction('MERGE_LEXEMES', data => ({
    request: {
        method: 'post',
        path: 'dictionary/merge',
        body: data
    }
}));

export const updateLexemePublishStatus = createAction(
    'UPDATE_LEXEME_PUBLISH_STATUS',
    (lexemeId, status) => ({
        request: {
            method: 'put',
            path: `dictionary/${lexemeId}/status`,
            body: { status }
        }
    })
);

export const deleteLexeme = createAction('DICTIONARY_DELETE_LEXEME', lexemeId => ({
    request: {
        method: 'delete',
        path: `dictionary/${lexemeId}`
    }
}));

export const actions = {
    getDictionary,
    unsetDictionary,
    createLexeme,
    updateLexeme,
    updateLexemePublishStatus,
    approveLexeme,
    mergeLexemes,
    deleteLexeme
};

export const dictionaryReducer = createReducer(null, {
    [getDictionary]: (state, action) => action.data,

    [unsetDictionary]: (state, action) => null,

    [createLexeme]: (state, action) => {
        return {
            ...state,
            lexemes: [action.data, ...state.lexemes]
        };
    },

    [updateLexeme]: (state, action) => {
        return {
            ...state,
            lexemes: state.lexemes.map(l => l.id === action.data.id ? action.data : l)
        };
    },

    [approveLexeme]: (state, action) => {
        return {
            ...state,
            lexemes: state.lexemes
                .map(l => l.id === action.data.id ? action.data : l)
                .filter(l => l.publishStatus === state.publishStatus)
        };
    },

    [mergeLexemes]: (state, action) => {
        const filteredLexemes = state.lexemes.filter(
            lexeme => !action.data.mergedLexemeIds.includes(lexeme.id)
        );

        return {
            ...state,
            lexemes:
            state.publishStatus === 'pending'
                ? filteredLexemes
                : [action.data.newLexeme, ...filteredLexemes]
        };
    },

    [updateLexemePublishStatus]: (state, action) => {
        if (!state?.lexemes) return state;

        return {
            ...state,
            lexemes: state.lexemes.filter(lexeme => lexeme.id !== action.data.id)
        };
    },

    [deleteLexeme]: (state, action) => {
        return {
            ...state,
            lexemes: state.lexemes.filter(lexeme => lexeme.id !== action.data.id)
        };
    }
});

export default dictionaryReducer;