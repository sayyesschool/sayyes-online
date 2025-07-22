import { useCallback } from 'react';

import { CMS_URL, LMS_URL } from 'shared/constants';
import http from 'shared/services/http';

const BASE_LMS_URL = `${LMS_URL}/api/vocabularies`;
const BASE_CMS_URL = `${CMS_URL}/api/dictionary`;

export function useLexiconApi() {
    const getLexemes = useCallback(ids => {
        if (!ids || ids.length === 0) {
            return Promise.resolve([]);
        }

        const path = window.location.hostname.startsWith('cms') ?
            `${BASE_CMS_URL}/lexemes` :
            `${BASE_LMS_URL}/my/lexemes`;

        return http.get(`${path}?ids=${ids.join(',')}`)
            .then(response => response.data);
    }, []);

    const addLexeme = useCallback(data => {
        return http.post(`${BASE_LMS_URL}/my`, data)
            .then(response => response.data);
    }, []);

    const addLexemes = useCallback((lexemeIds, data) => {
        return http.post(`${BASE_LMS_URL}/my/lexemes`, { lexemeIds, ...data })
            .then(response => response.data);
    }, []);

    const updateLexeme = useCallback((lexemeId, data) => {
        return http.put(`${BASE_LMS_URL}/my/${lexemeId}`, data)
            .then(response => response.data);
    }, []);

    const updateLexemeStatus = useCallback((lexemeId, data) => {
        return http.put(`${BASE_LMS_URL}/status/${lexemeId}`, data)
            .then(response => response.data);
    }, []);

    const deleteLexeme = useCallback((lexemeId, data) => {
        return http.delete(`${BASE_LMS_URL}/my/${lexemeId}`, data)
            .then(response => response.data);
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