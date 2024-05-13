import { useCallback, useState } from 'react';

import { useDebounce } from 'shared/hooks/fn';
import http from 'shared/services/http';

export function useSearch({
    initialQuery = '',
    apiUrl,
    limit,
    delay = 1000,
    params = {}
}) {
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const showMore = meta?.more;

    const debouncedSearch = useDebounce(async searchQuery => {
        try {
            const queryParams = new URLSearchParams({
                q: searchQuery,
                p: 1,
                c: limit,
                ...params
            });
            const response = await http.get(`${apiUrl}?${queryParams}`);
            setResults(response.data);
            setMeta(response.meta);
        } catch (error) {
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, delay);

    const handleInputChange = useCallback((e, inputValue) => {
        setLoading(true);
        setQuery(inputValue);
        debouncedSearch(inputValue);
    }, [debouncedSearch]);

    const loadMore = useCallback(async e => {
        e.stopPropagation();
        if (!showMore) return;

        try {
            setLoading(true);
            const nextPage = meta.batch + 1;
            const queryParams = new URLSearchParams({
                q: query,
                p: nextPage,
                c: limit,
                ...params
            });
            const response = await http.get(`${apiUrl}?${queryParams}`);
            setResults(prevResults => [...prevResults, ...response.data]);
            setMeta(response.meta);
        } finally {
            setLoading(false);
        }
    }, [showMore, meta?.batch, query, limit, params, apiUrl]);

    return { query, results, showMore, loading, handleInputChange, loadMore };
}