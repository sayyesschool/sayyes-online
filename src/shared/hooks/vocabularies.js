import { useCallback, useEffect, useState } from 'react';

import { useStore } from 'shared/hooks/store';
import http from 'shared/services/http';
import { actions as vocabulariesActions } from 'shared/store/modules/vocabularies';
import { hasKey } from 'shared/utils/object';

export function useVocabularySearch(query) {
    const [results, setResults] = useState();
    const [isLoading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const search = useCallback(() => {
        setLoading(true);
        const qs = new URLSearchParams(query).toString();
        http.get('/vocabulary/search?' + qs)
            .then(response => {
                setResults(response.data);
                setHasMore(response.meta.more);

                return response;
            })
            .finally(() => {
                setLoading(false);
            });
    }, [query]);

    return {
        search,
        results,
        isLoading,
        hasMore
    };
}

export function useVocabularies(query) {
    const [vocabularies, actions] = useStore(
        state => state && hasKey(state.vocabularies, 'list') ?
            state.vocabularies.list :
            state.vocabularies,
        vocabulariesActions
    );

    useEffect(() => {
        if (!vocabularies) {
            actions.getVocabularies(query);
        }
    }, [vocabularies]);

    return [vocabularies, actions];
}

export function useVocabulary(id) {
    const [vocabulary, actions] = useStore(
        state => state && hasKey(state.vocabularies, 'single') ?
            state.vocabularies.single :
            state.vocabulary,
        vocabulariesActions
    );

    useEffect(() => {
        if (!id) return;

        if (!vocabulary) {
            actions.getVocabulary(id);
        }

        return () => actions.unsetVocabulary();
    }, [id]);

    return [vocabulary, actions];
}