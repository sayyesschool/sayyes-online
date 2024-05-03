import {
    combineReducers,
    createAction,
    createReducer
} from 'shared/store/helpers';

export const getVocabularies = createAction('GET_VOCABULARIES', query => ({
    request: {
        method: 'get',
        path: 'vocabularies',
        query
    }
}));

export const getVocabulary = createAction('GET_VOCABULARY', id => ({
    request: {
        method: 'get',
        path: `vocabularies/${id}`
    }
}));

export const unsetVocabulary = createAction('UNSET_VOCABULARY');

export const addLexeme = createAction('ADD_LEXEME', (vocabularyId, data) => ({
    request: {
        method: 'post',
        path: `vocabularies/${vocabularyId}/`,
        body: data
    }
}));

export const updateLexeme = createAction(
    'UPDATE_LEXEME',
    (vocabularyId, lexemeId, data) => ({
        request: {
            method: 'put',
            path: `vocabularies/${vocabularyId}/${lexemeId}`,
            body: data
        }
    })
);

export const deleteLexeme = createAction(
    'DELETE_LEXEME',
    (vocabularyId, lexemeId) => ({
        request: {
            method: 'delete',
            path: `vocabularies/${vocabularyId}/${lexemeId}`
        }
    })
);

export const updateLexemeStatus = createAction(
    'UPDATE_LEXEME_STATUS',
    (lexemeId, status) => ({
        request: {
            method: 'put',
            path: `vocabularies/status/${lexemeId}`,
            body: { status }
        }
    })
);

export const actions = {
    getVocabularies,
    getVocabulary,
    unsetVocabulary,
    addLexeme,
    updateLexeme,
    deleteLexeme,
    updateLexemeStatus
};

export const vocabulariesReducer = createReducer(null, {
    [getVocabularies]: (state, action) => action.data,
    [addLexeme]: (state, action) =>
        state &&
      state.map(vocabulary => {
          return vocabulary.id === action.data.vocabularyId
              ? { ...vocabulary, numberOfLexemes: ++vocabulary.numberOfLexemes }
              : vocabulary;
      }),
    [deleteLexeme]: (state, action) =>
        state &&
      state.map(vocabulary =>
          vocabulary.id === action.data.vocabularyId
              ? { ...vocabulary, numberOfLexemes: --vocabulary.numberOfLexemes }
              : vocabulary
      )
});

export const vocabularyReducer = createReducer(null, {
    [getVocabulary]: (state, action) => action.data,
    [unsetVocabulary]: (state, action) => null,
    [addLexeme]: (state, action) => ({
        ...state,
        lexemes: [...state.lexemes, action.data],
        numberOfLexemes: ++state.numberOfLexemes
    }),
    [updateLexeme]: (state, action) => ({
        ...state,
        lexemes: state.lexemes.map(lexeme =>
            lexeme.id === action.data.id ? action.data : lexeme
        )
    }),
    [deleteLexeme]: (state, action) => ({
        ...state,
        lexemes: state.lexemes.filter(lexeme => lexeme.id !== action.data.id),
        numberOfLexemes: --state.numberOfLexemes
    }),
    [updateLexemeStatus]: (state, action) => ({
        ...state,
        lexemes: state.lexemes.map(lexeme =>
            lexeme.id === action.data.id
                ? { ...lexeme, data: action.data.lexiconData }
                : lexeme
        )
    })
});

export default combineReducers({
    list: vocabulariesReducer,
    single: vocabularyReducer
});