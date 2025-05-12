import { useEffect, useState } from 'react';

import { useDebounce } from 'shared/hooks/fn';
import http from 'shared/services/http';

const API_URL = 'api/dictionary/match';
const DEBOUNCE_DELAY = 500;

export default function useMatchingLexemes(lexemeId, value) {
    const [matchingLexemes, setMatchingLexemes] = useState([]);

    const search = useDebounce(value => {
        http.get(`${API_URL}?q=${value}&e=${lexemeId}`)
            .then(response => setMatchingLexemes(response.data));
    }, DEBOUNCE_DELAY, lexemeId);

    useEffect(() => {
        search(value);
    }, [value, search]);

    return matchingLexemes;
}