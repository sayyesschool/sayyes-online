import { useEffect } from 'react';

import { useStore } from 'shared/hooks/store';
import { actions as materialActions } from 'shared/store/modules/materials';

export function useMaterials(query) {
    const [materials, actions] = useStore(state => 'list' in state.materials ? state.materials.list : state.materials, materialActions);

    useEffect(() => {
        if (!materials) {
            actions.getMaterials(query);
        }
    }, []);

    return [materials, actions];
}

export function useMaterial(id) {
    const [material, actions] = useStore(state => 'single' in state.materials ? state.materials?.single : state.material, materialActions);

    useEffect(() => {
        if (!material) {
            actions.getMaterial(id);
        }

        return () => actions.unsetMaterial();
    }, [id]);

    return [material, actions];
}