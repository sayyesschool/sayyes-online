import { useEffect } from 'react';

import { useActions, useStore } from 'shared/hooks/store';
import { actions as dictionaryActions } from 'shared/store/modules/dictionary';
import { hasKey } from 'shared/utils/object';

import { LexemePublishStatus } from 'core/models/lexeme/constants';

export function useDictionary(publishStatus = LexemePublishStatus.Pending) {
    const [vocabulary, actions] = useStore(
        state => state && hasKey(state.dictionary, 'single') ?
            state.dictionary.single :
            state.dictionary,
        dictionaryActions
    );

    useEffect(() => {
        // TODO: unsetVocabulary возможно должно на onUnmouned
        actions.unsetDictionary();
        actions.getDictionary(publishStatus);
    }, [actions, publishStatus]);

    return [vocabulary, actions];
}

export function useDictionaryActions() {
    return useActions(
        dictionaryActions
    );
}