import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as materialActions } from 'shared/store/modules/material';

export function useMaterial(id) {
    const [material, actions] = useStore(state => state.material, materialActions);

    useEffect(() => {
        if (!material) {
            actions.getMaterial(id);
        }
    }, [id]);

    return [material, actions];
}