import {
    combineReducers,
    createAction,
    createReducer
} from 'shared/store/helpers';

export const getDictionary = createAction('GET_DICTIONARY', publishStatus => ({
    request: {
        method: 'get',
        path: `dictionary?publishStatus=${publishStatus}`
    }
}));

export const unsetDictionary = createAction('UNSET_DICTIONARY');

export const addLexeme = createAction('DICTIONARY_ADD_LEXEME', data => ({
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

export const updateLexemePublishStatus = createAction(
    'UPDATE_LEXEME_PUBLISH_STATUS',
    (lexemeId, status) => ({
        request: {
            method: 'put',
            path: `dictionary/status/${lexemeId}`,
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
    addLexeme,
    updateLexemePublishStatus,
    updateLexeme,
    deleteLexeme
};

export const dictionariesReducer = createReducer(null, {
    [addLexeme]: (state, action) =>
        state &&
    state.map(vocabulary =>
        vocabulary.id === action.data.vocabularyId ?
            {
                ...vocabulary,
                numberOfLexemes: vocabulary.numberOfLexemes + 1
            } :
            vocabulary
    )
});

export const dictionaryReducer = createReducer(null, {
    [getDictionary]: (state, action) => action.data,

    [unsetDictionary]: (state, action) => null,

    [addLexeme]: (state, action) => {
        return {
            ...state,
            lexemes: [action.data, ...state.lexemes]
        };
    },

    [updateLexeme]: (state, action) => {
        return {
            ...state,
            lexemes: state.lexemes.filter(lexeme => lexeme.id !== action.data.id)
        };
    },

    [updateLexemePublishStatus]: (state, action) => {
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

export default combineReducers({
    list: dictionariesReducer,
    single: dictionaryReducer
});