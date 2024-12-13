import {
    combineReducers,
    createAction,
    createReducer
} from 'shared/store/helpers';

export const getVocabulary = createAction('GET_VOCABULARY', approved => ({
    request: {
        method: 'get',
        path: 'dictionary'
    }
}));

export const unsetVocabulary = createAction('UNSET_VOCABULARY');

export const addLexeme = createAction('ADD_LEXEME', (vocabularyId, data) => ({
    request: {
        method: 'post',
        path: `dictionary/${vocabularyId}/`,
        body: data
    }
}));

export const updateLexemeStatus = createAction(
    'UPDATE_LEXEME_STATUS',
    (lexemeId, status) => ({
        request: {
            method: 'put',
            path: `dictionary/status/${lexemeId}`,
            body: { status }
        }
    })
);

export const actions = {
    getVocabulary,
    unsetVocabulary,
    addLexeme,
    updateLexemeStatus
};

export const vocabulariesReducer = createReducer(null, {
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

export const vocabularyReducer = createReducer(null, {
    [getVocabulary]: (state, action) => {
        console.log(777, action.data);

        return action.data;
    },

    [unsetVocabulary]: (state, action) => null,

    [addLexeme]: (state, action) => ({
        ...state,
        lexemes: [action.data, ...state.lexemes],
        numberOfLexemes: state.numberOfLexemes + 1
    }),

    [updateLexemeStatus]: (state, action) => state && ({
        ...state,
        lexemes: state.lexemes.map(lexeme =>
            lexeme.id !== action.data.id ? lexeme : {
                ...lexeme,
                ...action.data
            }
        )
    })
});

export default combineReducers({
    list: vocabulariesReducer,
    single: vocabularyReducer
});