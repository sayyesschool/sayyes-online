import { useCallback, useRef, useState } from 'react';

import http from 'shared/services/http';

export function useSearch({
    apiUrl,
    defaultParams = {}
}) {
    const paramsRef = useRef(defaultParams);

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);

    const _search = useCallback(async (params, options = { fresh: true }) => {
        if (!params.query) return;

        paramsRef.current = params;
        setQuery(params.query);
        setLoading(true);

        const searchParams = new URLSearchParams({
            q: params.query,
            b: params.batch,
            c: params.limit,
            ...params
        });

        try {
            const response = await http.get(`${apiUrl}?${searchParams}`);

            setResults(results =>
                options.fresh ?
                    response.data :
                    [...results, ...response.data]
            );

            setMeta(response.meta);

            return response;
        } catch (error) {
            paramsRef.current = {};
            setResults([]);
            setMeta(null);
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    const search = useCallback(async (arg = {}) => {
        const params = typeof arg === 'string' ?
            { query: arg } : arg;

        const response = await _search(params);

        return response;
    }, [_search]);

    const searchMore = useCallback(async () => {
        if (!meta.more) return;

        const response = await _search({
            batch: meta.batch + 1,
            ...paramsRef.current
        }, {
            fresh: false
        });

        return response;
    }, [_search, meta]);

    const reset = useCallback(() => {
        setQuery('');
        setResults([]);
        setMeta(null);
    }, []);

    return {
        query,
        results,
        meta,
        loading,
        search,
        searchMore,
        reset
    };
}