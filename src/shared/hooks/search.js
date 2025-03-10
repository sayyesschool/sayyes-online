import { useCallback, useRef, useState } from 'react';

import http from 'shared/services/http';
import { debounce } from 'shared/utils/fn';
import { stripEmptyValues } from 'shared/utils/object';

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

export function useSearchData({
    query: defaultQuery,
    params: defaultParams,
    changeDelay = 1000,
    onChange,
    onClear
} = {}) {
    const defaultParamsRef = useRef(defaultParams);
    const onQueryChangeRef = useRef(debounce(data => {
        setLoading(true);
        onChange(data).finally(() => setLoading(false));
    }, changeDelay));
    const onFilterChangeRef = useRef(data => {
        setLoading(true);
        onChange(data).finally(() => setLoading(false));
    });

    const [query, _setQuery] = useState(defaultQuery);
    const [params, _setParams] = useState(defaultParams);
    const [isLoading, setLoading] = useState(false);

    const setQuery = useCallback(value => {
        _setQuery(value);

        onQueryChangeRef.current?.(value ? { query: value } : {});
    }, []);

    const setParam = useCallback(({ name, value } = {}) => {
        _setParams(filter => {
            const newFilter = {
                ...filter,
                [name]: value
            };

            onFilterChangeRef.current?.(stripEmptyValues(newFilter));

            return newFilter;
        });
    }, []);

    const clearQuery = useCallback(() => {
        _setQuery('');
        onClear();
    }, [onClear]);

    const clearParams = useCallback(() => {
        _setParams(defaultParamsRef.current);
        onClear();
    }, [onClear]);

    return {
        query,
        params,
        isLoading,
        setQuery,
        setParam,
        clearQuery,
        clearParams
    };
}