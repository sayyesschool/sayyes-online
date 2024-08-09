import { useEffect } from 'react';

import { useActions, useStore } from 'shared/hooks/store';
import { actions as vocabulariesActions } from 'shared/store/modules/vocabularies';
import { hasKey } from 'shared/utils/object';

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

export function useVocabulary(id, { learnerId } = {}) {
    const [vocabulary, actions] = useStore(
        state => state && hasKey(state.vocabularies, 'single') ?
            state.vocabularies.single :
            state.vocabulary,
        vocabulariesActions
    );

    const vocabularyId = vocabulary?.id;

    useEffect(() => {
        if (id === vocabularyId || learnerId === '') return;

        actions.unsetVocabulary();
        actions.getVocabulary(id, learnerId ? { learnerId } : undefined);
    }, [id, vocabularyId, actions, learnerId]);

    return [vocabulary, actions];
}

export function useVocabularyActions() {
    return useActions(
        vocabulariesActions
    );
}