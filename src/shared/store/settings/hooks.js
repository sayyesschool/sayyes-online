import { useCallback, useEffect } from 'react';

import { useStore } from 'shared/hooks/store';

import { actions as unboundActions } from './actions';

export function useSettings() {
    const [settings, actions] = useStore(state => state.settings, unboundActions);

    useEffect(() => {
        if (settings) return;

        actions.getSettings();
    }, [settings, actions]);

    return [settings, actions];
}

export function useSetting(key) {
    const [settings, actions] = useSettings();

    const setting = settings?.[key];

    const set = useCallback(value => {
        return actions.setSetting(key, value);
    }, [actions, key]);

    return [setting, set];
}