import { useCallback, useEffect } from 'react';

import { LexemePublishStatus } from 'core/models/lexeme/constants';

import { CMS_URL } from 'shared/constants';
import { useActions, useStore } from 'shared/hooks/store';
import http from 'shared/services/http';
import { actions as dictionaryActions } from 'shared/store/modules/dictionary';

export function useDictionary(publishStatus = LexemePublishStatus.Pending) {
    const [dictionary, actions] = useStore(
        state => state.dictionary,
        dictionaryActions
    );

    useEffect(() => {
        // TODO: unsetVocabulary возможно должно на onUnmouned
        actions.unsetDictionary();
        actions.getDictionary(publishStatus);
    }, [actions, publishStatus]);

    return [dictionary, actions];
}

export function useDictionaryActions() {
    return useActions(dictionaryActions);
}

const DICTIONARY_URL = `${CMS_URL}/api/dictionary`;

export function useDictionaryApi() {
    const getLexemes = useCallback(ids => {
        return http.get(`${DICTIONARY_URL}/lexemes?ids=${ids.join(',')}`)
            .then(response => response.data);
    }, []);

    const createLexeme = useCallback(data => {
        return http.post(DICTIONARY_URL, data)
            .then(response => response.data);
    }, []);

    const updateLexeme = useCallback((lexemeId, data) => {
        return http.put(`/${DICTIONARY_URL}/${lexemeId}`, data)
            .then(response => response.data);
    }, []);

    const updateLexemePublishStatus = useCallback((lexemeId, status) => {
        return http.put(`/api/vocabularies/status/${lexemeId}`, { status })
            .then(response => response.data);
    }, []);

    const deleteLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите удалить слово')) {
            return http.delete(`/api/vocabularies/my/${lexemeId}`)
                .then(response => response.data);
        }
    }, []);

    return {
        getLexemes,
        createLexeme,
        updateLexeme,
        updateLexemePublishStatus,
        deleteLexeme
    };
}