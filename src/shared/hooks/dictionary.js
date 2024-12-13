import { useEffect } from 'react';

import { useActions, useStore } from 'shared/hooks/store';
import { actions as dictionaryActions } from 'shared/store/modules/dictionary';
import { hasKey } from 'shared/utils/object';

export function useDictionary() {
    const [vocabulary, actions] = useStore(
        state => state && hasKey(state.dictionary, 'single') ?
            state.dictionary.single :
            state.dictionary,
        dictionaryActions
    );

    useEffect(() => {
        actions.unsetVocabulary();
        actions.getVocabulary();
    }, [actions]);

    return [vocabulary, actions];
}

export function useDictionaryActions() {
    return useActions(
        dictionaryActions
    );
}