import { useCallback } from 'react';

import { LMS_URL } from 'shared/constants';
import http from 'shared/services/http';

const BASE_URL = `${LMS_URL}/api/vocabularies`;

export function useLexiconApi() {
    const getLexemes = useCallback(ids => {
        if (!ids || ids.length === 0) {
            return Promise.resolve([]);
        }

        return http.get(`${BASE_URL}/my/lexemes?ids=${ids.join(',')}`)
            .then(response => response.data);
    }, []);

    const addLexeme = useCallback(data => {
        return http.post(`${BASE_URL}/my`, data)
            .then(response => response.data);;
    }, []);

    const addLexemes = useCallback(ids => {
        return http.post(`${BASE_URL}/my/lexemes`, { ids })
            .then(response => response.data);
    }, []);

    const updateLexeme = useCallback((lexemeId, data) => {
        return http.put(`${BASE_URL}/my/${lexemeId}`, data)
            .then(response => response.data);
    }, []);

    const updateLexemeStatus = useCallback((lexemeId, status) => {
        return http.put(`${BASE_URL}/status/${lexemeId}`, { status })
            .then(response => response.data);
    }, []);

    const deleteLexeme = useCallback(lexemeId => {
        if (confirm('Вы уверены что хотите удалить слово')) {
            return http.delete(`${BASE_URL}/my/${lexemeId}`)
                .then(response => response.data);
        }
    }, []);

    return {
        getLexemes,
        addLexeme,
        addLexemes,
        updateLexeme,
        updateLexemeStatus,
        deleteLexeme
    };
}