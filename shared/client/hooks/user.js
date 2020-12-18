import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as userActions } from 'shared/store/modules/user';

function useUser() {
    const [user, actions] = useStore(state => state.user, userActions);

    useEffect(() => {
        if (!user) {
            actions.getUser();
        }
    }, []);

    return [user, actions];
}

export { useUser as default, useUser };