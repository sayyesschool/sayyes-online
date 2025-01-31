import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as _actions } from 'shared/store/modules/managers';
import { selectList, selectSingle } from 'shared/store/selectors';

export function useManagers(query) {
    const [managers, actions] = useStore(selectList('managers'), _actions);

    useEffect(() => {
        if (!managers) {
            actions.getManagers(query);
        }
    }, []);

    return [managers, actions];
}

export function useManager(id) {
    const [manager, actions] = useStore(selectSingle('managers'), _actions);
    const managerId = manager?.id;

    useEffect(() => {
        if (managerId !== id) {
            actions.getManager(id);
        }
    }, [managerId, id, actions]);

    useEffect(() => {
        return () => actions.unsetManager();
    }, [actions]);

    return [manager, actions];
}