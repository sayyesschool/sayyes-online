import { useEffect } from 'react';

import { LexemePublishStatus } from 'core/models/lexeme/constants';

import { useActions, useStore } from 'shared/hooks/store';
import { actions as dictionaryActions } from 'shared/store/modules/dictionary';

export function useDictionary(publishStatus = LexemePublishStatus.Pending) {
    const [dictionary, actions] = useStore(
        state => state.dictionary,
        dictionaryActions
    );

    useEffect(() => {
        // TODO: unsetVocabulary возможно должно на onUnmouned
        actions.unsetDictionary();
        actions.getDictionary(publishStatus);
    }, [actions, publishStatus]);

    return [dictionary, actions];
}

export function useDictionaryActions() {
    return useActions(dictionaryActions);
}