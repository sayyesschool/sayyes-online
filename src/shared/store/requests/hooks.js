import { useEffect } from 'react';

import { useActions, useStore } from 'shared/hooks/store';
import { selectList, selectSingle } from 'shared/store/selectors';

import * as unboundActions from './actions';

export function useRequestActions() {
    return useActions(unboundActions);
}

export function useRequests(query) {
    const [requests, actions] = useStore(selectList('requests'), unboundActions);

    useEffect(() => {
        if (!requests) {
            actions.getRequests(query);
        }
    }, []);

    return [requests, actions];
}

export function useRequest(id) {
    const [request, actions] = useStore(selectSingle('requests'), unboundActions);

    const requestId = request?.id;

    useEffect(() => {
        if (requestId !== id && id) {
            actions.getRequest(id);
        }
    }, [requestId, id, actions]);

    return [request, actions];
}