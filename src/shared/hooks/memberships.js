import { useEffect, useState } from 'react';

import { useStore } from 'shared/hooks/store';
import http from 'shared/services/http';
import { actions as membershipActions } from 'shared/store/modules/memberships';
import { selectList } from 'shared/store/selectors';

export function useMemberships(query) {
    const [memberships, actions] = useStore(selectList('memberships'), membershipActions);

    useEffect(() => {
        if (!memberships) {
            actions.getMemberships(query);
        }
    }, []);

    return [memberships, actions];
}

export function useMembership(id) {
    const [membership, actions] = useStore(state => state.membership, membershipActions);

    useEffect(() => {
        if (!membership) {
            actions.getMembership(id);
        }

        return () => actions.unsetMembership();
    }, [id]);

    return [membership, actions];
}

export function useMembershipOptions() {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        http.get('/api/memberships/options')
            .then(({ data }) => setOptions(data));
    }, []);

    return options;
}