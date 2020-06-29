import { useState, useActions } from 'shared/hooks/store';

import * as modules from './modules';

export default function useStore(key) {
    const state = useState(state => state[key]);
    const actions = useActions(modules[key]);

    return [state, actions];
}